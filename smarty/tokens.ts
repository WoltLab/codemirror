/**
 * Mirrors the tag detection of `TemplateScriptingCompiler`: a tag starts with
 * `{` followed by a non-whitespace character, `{}` is left alone.
 *
 * @author Alexander Ebert
 * @copyright 2001-2026 WoltLab GmbH
 * @license LGPL-2.1-or-later
 * @since 6.3
 */

import { ExternalTokenizer, type InputStream } from "@lezer/lr";
import { Comment, endTagStart, literalEndTagStart, literalText, tagStart, text } from "./smarty.grammar.terms";

const enum Ch {
  Tab = 9,
  Newline = 10,
  VerticalTab = 11,
  FormFeed = 12,
  CarriageReturn = 13,
  Space = 32,
  Asterisk = 42,
  Slash = 47,
  BraceL = 123,
  BraceR = 125,
}

function isWhitespace(ch: number): boolean {
  return ch === Ch.Space || (ch >= Ch.Tab && ch <= Ch.CarriageReturn);
}

// `{{` is treated as text, because it starts the embedded objects of pages
// and boxes, such as `{{ media="1" }}`, which are not template tags.
function startsTag(input: InputStream): boolean {
  if (input.next !== Ch.BraceL) {
    return false;
  }

  const next = input.peek(1);
  return next !== -1 && !isWhitespace(next) && next !== Ch.BraceL && next !== Ch.BraceR;
}

function scanComment(input: InputStream): void {
  input.advance(2);

  for (;;) {
    if (input.next === -1) {
      break;
    }

    if (input.next === Ch.Asterisk && input.peek(1) === Ch.BraceR) {
      input.advance(2);
      break;
    }

    input.advance();
  }

  input.acceptToken(Comment);
}

export const base = new ExternalTokenizer((input) => {
  const start = input.pos;

  for (;;) {
    const next = input.next;
    if (next === -1) {
      break;
    }

    if (startsTag(input)) {
      if (input.pos > start) {
        break;
      }

      const after = input.peek(1);
      if (after === Ch.Asterisk) {
        scanComment(input);
      } else if (after === Ch.Slash) {
        input.acceptToken(endTagStart, 2);
      } else {
        input.acceptToken(tagStart, 1);
      }

      return;
    }

    input.advance();

    // Ending text tokens at line breaks keeps incremental reparsing cheap.
    if (next === Ch.Newline) {
      break;
    }
  }

  if (input.pos > start) {
    input.acceptToken(text);
  }
});

const literalEnd = "{/literal}";

function isLiteralEnd(input: InputStream): boolean {
  for (let i = 0; i < literalEnd.length; i++) {
    if (input.peek(i) !== literalEnd.charCodeAt(i)) {
      return false;
    }
  }

  return true;
}

export const literal = new ExternalTokenizer((input) => {
  const start = input.pos;

  for (;;) {
    const next = input.next;
    if (next === -1) {
      break;
    }

    if (isLiteralEnd(input)) {
      if (input.pos > start) {
        break;
      }

      input.acceptToken(literalEndTagStart, 2);
      return;
    }

    input.advance();

    if (next === Ch.Newline) {
      break;
    }
  }

  if (input.pos > start) {
    input.acceptToken(literalText);
  }
});

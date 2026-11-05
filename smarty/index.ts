/**
 * Smarty support for the WoltLab Suite template engine, parsed as an overlay
 * on top of HTML.
 *
 * @author Alexander Ebert
 * @copyright 2001-2026 WoltLab GmbH
 * @license LGPL-2.1-or-later
 * @since 6.3
 */

import { html, htmlLanguage } from "@codemirror/lang-html";
import { foldNodeProp, indentNodeProp, delimitedIndent, LanguageSupport, LRLanguage } from "@codemirror/language";
import { parseMixed } from "@lezer/common";
import { styleTags, tags as t } from "@lezer/highlight";
import { parser } from "./smarty.grammar";

const commentTokens = { block: { open: "{*", close: "*}" } };

const tagLanguage = LRLanguage.define({
  name: "smarty",
  parser: parser.configure({
    props: [
      styleTags({
        "if elseif else": t.controlKeyword,
        "TagName literal": t.keyword,
        "unsafe OutputPrefix/...": t.modifier,
        Variable: t.special(t.variableName),
        Constant: t.constant(t.variableName),
        PropertyName: t.propertyName,
        ModifierName: t.function(t.variableName),
        AttributeName: t.attributeName,
        BareWord: t.atom,
        StringLiteral: t.string,
        NumberLiteral: t.number,
        BooleanLiteral: t.bool,
        CompareOp: t.compareOperator,
        'LogicOp "!"': t.logicOperator,
        "ArithOp -": t.arithmeticOperator,
        "=": t.definitionOperator,
        ". -> ?->": t.derefOperator,
        "| : ,": t.punctuation,
        "( )": t.paren,
        "[ ]": t.squareBracket,
        "{ }": t.brace,
        Comment: t.blockComment,
      }),
      indentNodeProp.add({
        Tag: delimitedIndent({ closing: "}" }),
      }),
      foldNodeProp.add({
        Comment: (node, state) =>
          state.sliceDoc(node.to - 2, node.to) === "*}" ? { from: node.from + 2, to: node.to - 2 } : null,
      }),
    ],
  }),
  languageData: {
    commentTokens,
  },
});

export const smartyLanguage = tagLanguage.configure(
  {
    wrap: parseMixed((node) =>
      node.type.isTop
        ? {
            parser: htmlLanguage.parser,
            overlay: (node) => node.name === "Text" || node.name === "LiteralText",
          }
        : null,
    ),
  },
  "smarty",
);

export function smarty(): LanguageSupport {
  const base = html();

  return new LanguageSupport(smartyLanguage, [
    base.support,
    // Comments toggled in the HTML parts of a template must not end up in
    // the output, a Smarty comment is removed by the template compiler.
    htmlLanguage.data.of({ commentTokens }),
  ]);
}

/**
 * Lazily loaded language support, keyed by the mode names of CodeMirror 5
 * that `SourceCodeFormField::LANGUAGES` and `shared_codemirror` use.
 *
 * @author Alexander Ebert
 * @copyright 2001-2026 WoltLab GmbH
 * @license LGPL-2.1-or-later
 * @since 6.3
 */

import { LanguageSupport, StreamLanguage, type StreamParser } from "@codemirror/language";

function legacy(parser: StreamParser<unknown>): LanguageSupport {
  return new LanguageSupport(StreamLanguage.define(parser));
}

// `haml`, `haskell-literate`, `rst` and `slim` have no counterpart in
// CodeMirror 6 and fall back to plain text. `smarty` used plain text as the
// base mode in CodeMirror 5, but every template is HTML.
const languages = new Map<string, () => Promise<LanguageSupport>>([
  ["apl", async () => legacy((await import("@codemirror/legacy-modes/mode/apl")).apl)],
  ["asciiarmor", async () => legacy((await import("@codemirror/legacy-modes/mode/asciiarmor")).asciiArmor)],
  ["asn.1", async () => legacy((await import("@codemirror/legacy-modes/mode/asn1")).asn1({}))],
  ["asterisk", async () => legacy((await import("@codemirror/legacy-modes/mode/asterisk")).asterisk)],
  ["brainfuck", async () => legacy((await import("@codemirror/legacy-modes/mode/brainfuck")).brainfuck)],
  ["clike", async () => legacy((await import("@codemirror/legacy-modes/mode/clike")).c)],
  ["clojure", async () => legacy((await import("@codemirror/legacy-modes/mode/clojure")).clojure)],
  ["cmake", async () => legacy((await import("@codemirror/legacy-modes/mode/cmake")).cmake)],
  ["cobol", async () => legacy((await import("@codemirror/legacy-modes/mode/cobol")).cobol)],
  ["coffeescript", async () => legacy((await import("@codemirror/legacy-modes/mode/coffeescript")).coffeeScript)],
  ["commonlisp", async () => legacy((await import("@codemirror/legacy-modes/mode/commonlisp")).commonLisp)],
  ["crystal", async () => legacy((await import("@codemirror/legacy-modes/mode/crystal")).crystal)],
  ["css", async () => (await import("@codemirror/lang-css")).css()],
  ["cypher", async () => legacy((await import("@codemirror/legacy-modes/mode/cypher")).cypher)],
  ["d", async () => legacy((await import("@codemirror/legacy-modes/mode/d")).d)],
  ["dart", async () => legacy((await import("@codemirror/legacy-modes/mode/clike")).dart)],
  ["diff", async () => legacy((await import("@codemirror/legacy-modes/mode/diff")).diff)],
  ["django", async () => (await import("@codemirror/lang-jinja")).jinja()],
  ["dockerfile", async () => legacy((await import("@codemirror/legacy-modes/mode/dockerfile")).dockerFile)],
  ["dtd", async () => legacy((await import("@codemirror/legacy-modes/mode/dtd")).dtd)],
  ["dylan", async () => legacy((await import("@codemirror/legacy-modes/mode/dylan")).dylan)],
  ["ebnf", async () => legacy((await import("@codemirror/legacy-modes/mode/ebnf")).ebnf)],
  ["ecl", async () => legacy((await import("@codemirror/legacy-modes/mode/ecl")).ecl)],
  ["eiffel", async () => legacy((await import("@codemirror/legacy-modes/mode/eiffel")).eiffel)],
  ["elm", async () => legacy((await import("@codemirror/legacy-modes/mode/elm")).elm)],
  ["erlang", async () => legacy((await import("@codemirror/legacy-modes/mode/erlang")).erlang)],
  ["factor", async () => legacy((await import("@codemirror/legacy-modes/mode/factor")).factor)],
  ["fcl", async () => legacy((await import("@codemirror/legacy-modes/mode/fcl")).fcl)],
  ["forth", async () => legacy((await import("@codemirror/legacy-modes/mode/forth")).forth)],
  ["fortran", async () => legacy((await import("@codemirror/legacy-modes/mode/fortran")).fortran)],
  ["gas", async () => legacy((await import("@codemirror/legacy-modes/mode/gas")).gas)],
  [
    "gfm",
    async () => {
      const { markdown, markdownLanguage } = await import("@codemirror/lang-markdown");
      return markdown({ base: markdownLanguage });
    },
  ],
  ["gherkin", async () => legacy((await import("@codemirror/legacy-modes/mode/gherkin")).gherkin)],
  ["go", async () => (await import("@codemirror/lang-go")).go()],
  ["groovy", async () => legacy((await import("@codemirror/legacy-modes/mode/groovy")).groovy)],
  ["handlebars", async () => (await import("@codemirror/lang-html")).html()],
  ["haskell", async () => legacy((await import("@codemirror/legacy-modes/mode/haskell")).haskell)],
  ["haxe", async () => legacy((await import("@codemirror/legacy-modes/mode/haxe")).haxe)],
  ["htmlembedded", async () => (await import("@codemirror/lang-html")).html()],
  ["htmlmixed", async () => (await import("@codemirror/lang-html")).html()],
  ["http", async () => legacy((await import("@codemirror/legacy-modes/mode/http")).http)],
  ["idl", async () => legacy((await import("@codemirror/legacy-modes/mode/idl")).idl)],
  ["javascript", async () => (await import("@codemirror/lang-javascript")).javascript()],
  ["jinja2", async () => (await import("@codemirror/lang-jinja")).jinja()],
  ["jsx", async () => (await import("@codemirror/lang-javascript")).javascript({ jsx: true })],
  ["julia", async () => legacy((await import("@codemirror/legacy-modes/mode/julia")).julia)],
  ["livescript", async () => legacy((await import("@codemirror/legacy-modes/mode/livescript")).liveScript)],
  ["lua", async () => legacy((await import("@codemirror/legacy-modes/mode/lua")).lua)],
  ["markdown", async () => (await import("@codemirror/lang-markdown")).markdown()],
  ["mathematica", async () => legacy((await import("@codemirror/legacy-modes/mode/mathematica")).mathematica)],
  ["mbox", async () => legacy((await import("@codemirror/legacy-modes/mode/mbox")).mbox)],
  ["mirc", async () => legacy((await import("@codemirror/legacy-modes/mode/mirc")).mirc)],
  ["mllike", async () => legacy((await import("@codemirror/legacy-modes/mode/mllike")).oCaml)],
  ["modelica", async () => legacy((await import("@codemirror/legacy-modes/mode/modelica")).modelica)],
  ["mscgen", async () => legacy((await import("@codemirror/legacy-modes/mode/mscgen")).mscgen)],
  ["mumps", async () => legacy((await import("@codemirror/legacy-modes/mode/mumps")).mumps)],
  ["nginx", async () => legacy((await import("@codemirror/legacy-modes/mode/nginx")).nginx)],
  ["nsis", async () => legacy((await import("@codemirror/legacy-modes/mode/nsis")).nsis)],
  ["ntriples", async () => legacy((await import("@codemirror/legacy-modes/mode/ntriples")).ntriples)],
  ["octave", async () => legacy((await import("@codemirror/legacy-modes/mode/octave")).octave)],
  ["oz", async () => legacy((await import("@codemirror/legacy-modes/mode/oz")).oz)],
  ["pascal", async () => legacy((await import("@codemirror/legacy-modes/mode/pascal")).pascal)],
  ["pegjs", async () => legacy((await import("@codemirror/legacy-modes/mode/pegjs")).pegjs)],
  ["perl", async () => legacy((await import("@codemirror/legacy-modes/mode/perl")).perl)],
  ["php", async () => (await import("@codemirror/lang-php")).php()],
  ["pig", async () => legacy((await import("@codemirror/legacy-modes/mode/pig")).pig)],
  ["powershell", async () => legacy((await import("@codemirror/legacy-modes/mode/powershell")).powerShell)],
  ["properties", async () => legacy((await import("@codemirror/legacy-modes/mode/properties")).properties)],
  ["protobuf", async () => legacy((await import("@codemirror/legacy-modes/mode/protobuf")).protobuf)],
  ["pug", async () => legacy((await import("@codemirror/legacy-modes/mode/pug")).pug)],
  ["puppet", async () => legacy((await import("@codemirror/legacy-modes/mode/puppet")).puppet)],
  ["python", async () => (await import("@codemirror/lang-python")).python()],
  ["q", async () => legacy((await import("@codemirror/legacy-modes/mode/q")).q)],
  ["r", async () => legacy((await import("@codemirror/legacy-modes/mode/r")).r)],
  ["rpm", async () => legacy((await import("@codemirror/legacy-modes/mode/rpm")).rpmSpec)],
  ["ruby", async () => legacy((await import("@codemirror/legacy-modes/mode/ruby")).ruby)],
  ["rust", async () => (await import("@codemirror/lang-rust")).rust()],
  ["sas", async () => legacy((await import("@codemirror/legacy-modes/mode/sas")).sas)],
  ["sass", async () => (await import("@codemirror/lang-sass")).sass({ indented: true })],
  ["scheme", async () => legacy((await import("@codemirror/legacy-modes/mode/scheme")).scheme)],
  ["shell", async () => legacy((await import("@codemirror/legacy-modes/mode/shell")).shell)],
  ["sieve", async () => legacy((await import("@codemirror/legacy-modes/mode/sieve")).sieve)],
  ["smalltalk", async () => legacy((await import("@codemirror/legacy-modes/mode/smalltalk")).smalltalk)],
  ["smarty", async () => (await import("./smarty")).smarty()],
  ["smartymixed", async () => (await import("./smarty")).smarty()],
  ["solr", async () => legacy((await import("@codemirror/legacy-modes/mode/solr")).solr)],
  ["soy", async () => (await import("@codemirror/lang-html")).html()],
  ["sparql", async () => legacy((await import("@codemirror/legacy-modes/mode/sparql")).sparql)],
  ["spreadsheet", async () => legacy((await import("@codemirror/legacy-modes/mode/spreadsheet")).spreadsheet)],
  ["sql", async () => (await import("@codemirror/lang-sql")).sql()],
  ["stex", async () => legacy((await import("@codemirror/legacy-modes/mode/stex")).stex)],
  ["stylus", async () => legacy((await import("@codemirror/legacy-modes/mode/stylus")).stylus)],
  ["swift", async () => legacy((await import("@codemirror/legacy-modes/mode/swift")).swift)],
  ["tcl", async () => legacy((await import("@codemirror/legacy-modes/mode/tcl")).tcl)],
  ["text/x-less", async () => (await import("@codemirror/lang-less")).less()],
  ["text/x-scss", async () => (await import("@codemirror/lang-sass")).sass()],
  ["textile", async () => legacy((await import("@codemirror/legacy-modes/mode/textile")).textile)],
  ["tiddlywiki", async () => legacy((await import("@codemirror/legacy-modes/mode/tiddlywiki")).tiddlyWiki)],
  ["tiki", async () => legacy((await import("@codemirror/legacy-modes/mode/tiki")).tiki)],
  ["toml", async () => legacy((await import("@codemirror/legacy-modes/mode/toml")).toml)],
  ["tornado", async () => (await import("@codemirror/lang-jinja")).jinja()],
  ["troff", async () => legacy((await import("@codemirror/legacy-modes/mode/troff")).troff)],
  ["ttcn", async () => legacy((await import("@codemirror/legacy-modes/mode/ttcn")).ttcn)],
  ["ttcn-cfg", async () => legacy((await import("@codemirror/legacy-modes/mode/ttcn-cfg")).ttcnCfg)],
  ["turtle", async () => legacy((await import("@codemirror/legacy-modes/mode/turtle")).turtle)],
  ["twig", async () => (await import("@codemirror/lang-jinja")).jinja()],
  ["vb", async () => legacy((await import("@codemirror/legacy-modes/mode/vb")).vb)],
  ["vbscript", async () => legacy((await import("@codemirror/legacy-modes/mode/vbscript")).vbScript)],
  ["velocity", async () => legacy((await import("@codemirror/legacy-modes/mode/velocity")).velocity)],
  ["verilog", async () => legacy((await import("@codemirror/legacy-modes/mode/verilog")).verilog)],
  ["vhdl", async () => legacy((await import("@codemirror/legacy-modes/mode/vhdl")).vhdl)],
  ["vue", async () => (await import("@codemirror/lang-vue")).vue()],
  ["wast", async () => legacy((await import("@codemirror/legacy-modes/mode/wast")).wast)],
  ["webidl", async () => legacy((await import("@codemirror/legacy-modes/mode/webidl")).webIDL)],
  ["xml", async () => (await import("@codemirror/lang-xml")).xml()],
  ["xquery", async () => legacy((await import("@codemirror/legacy-modes/mode/xquery")).xQuery)],
  ["yacas", async () => legacy((await import("@codemirror/legacy-modes/mode/yacas")).yacas)],
  ["yaml", async () => (await import("@codemirror/lang-yaml")).yaml()],
  [
    "yaml-frontmatter",
    async () => {
      const [{ yamlFrontmatter }, { markdown, markdownLanguage }] = await Promise.all([
        import("@codemirror/lang-yaml"),
        import("@codemirror/lang-markdown"),
      ]);
      return yamlFrontmatter({ content: markdown({ base: markdownLanguage }) });
    },
  ],
  ["z80", async () => legacy((await import("@codemirror/legacy-modes/mode/z80")).z80)],
]);

/**
 * Resolves to `undefined` for unknown names, which callers treat as plain text.
 */
export async function loadLanguage(name: string): Promise<LanguageSupport | undefined> {
  const loader = languages.get(name);
  if (loader === undefined) {
    return undefined;
  }

  return loader();
}

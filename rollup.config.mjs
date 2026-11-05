import { lezer } from "@lezer/generator/rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import esbuild, { minify } from "rollup-plugin-esbuild";

// Names the lazily loaded chunks after the package or legacy mode they
// provide, keeping the file names stable across builds.
function chunkFileName(chunk) {
  const id = chunk.facadeModuleId ?? "";

  const legacyMode = id.match(/@codemirror\/legacy-modes\/mode\/([^/]+)\.js$/);
  if (legacyMode !== null) {
    return `chunks/legacy-${legacyMode[1]}.js`;
  }

  const languagePackage = id.match(/@(?:codemirror|lezer)\/([^/]+)\/dist\//);
  if (languagePackage !== null) {
    return `chunks/${languagePackage[1]}.js`;
  }

  if (id.endsWith("/smarty/index.ts")) {
    return "chunks/smarty.js";
  }

  return "chunks/[name].js";
}

export default {
  input: "index.ts",
  preserveEntrySignatures: "allow-extension",
  output: {
    dir: "dist",
    format: "amd",
    entryFileNames: "codemirror.js",
    chunkFileNames: chunkFileName,
    plugins: [minify({ target: "es2022" })],
  },
  plugins: [lezer(), nodeResolve(), esbuild({ target: "es2022" })],
};

/**
 * Bundles CodeMirror 6 as a single AMD module. Each package of CodeMirror must
 * be present exactly once, because extensions are identified by object
 * identity across packages.
 *
 * @author Alexander Ebert
 * @copyright 2001-2026 WoltLab GmbH
 * @license LGPL-2.1-or-later
 * @since 6.3
 */

export * from "@codemirror/autocomplete";
export * from "@codemirror/commands";
export * from "@codemirror/language";
export * from "@codemirror/lint";
export * from "@codemirror/search";
export * from "@codemirror/state";
export * from "@codemirror/view";
export { basicSetup, minimalSetup } from "codemirror";
export { loadLanguage } from "./languages";

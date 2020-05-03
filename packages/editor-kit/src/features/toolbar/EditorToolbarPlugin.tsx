import { Plugin } from "../../plugins/Plugin";
import { EditorToolbarGlobalStyle } from "./EditorToolbarGlobalStyle";

export const EditorToolbarPlugin: Plugin = {
  name: "editor-toolbar",
  globalStyle: EditorToolbarGlobalStyle,
};

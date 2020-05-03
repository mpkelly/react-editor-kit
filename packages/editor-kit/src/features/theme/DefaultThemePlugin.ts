import { Plugin } from "../../plugins/Plugin";
import { DefaultThemeEditorStyle } from "./DefaultThemeEditorStyle";
import { DefaultThemeGlobalStyle } from "./DefaultThemeGlobalStyle";

export const DefaultThemePlugin: Plugin = {
  name: "default-theme",
  editorStyle: DefaultThemeEditorStyle,
  globalStyle: DefaultThemeGlobalStyle,
};

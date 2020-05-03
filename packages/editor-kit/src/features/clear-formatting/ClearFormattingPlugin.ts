import { Plugin } from "../../plugins/Plugin";
import { ClearFormattingPluginAction } from "./ClearFormattingPluginAction";

export const DefaultClearableEditorFormats = [
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "fontSize",
  "fontColor",
  "backgroundColor",
];

export const createClearFormattingPlugin = (
  formats = DefaultClearableEditorFormats
): Plugin => {
  return {
    name: "clear-formatting",
    formats,
    actions: [ClearFormattingPluginAction],
  };
};

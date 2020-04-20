import { Plugin } from "../../plugins/Plugin";
import { Transforms } from "slate";

export const AutoFocusPlugin: Plugin = {
  name: "autofocus",
  withPlugin: (editor) => {
    const { normalizeNode } = editor;
    editor.normalizeNode = ([node, path]) => {
      if (node.autoFocus) {
        Transforms.setNodes(editor, { autoFocus: undefined }, { at: path });
        Transforms.select(editor, path);
      }
      return normalizeNode([node, path]);
    };
    return editor;
  },
};

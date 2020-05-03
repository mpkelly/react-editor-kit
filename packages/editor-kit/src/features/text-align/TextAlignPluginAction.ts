import { Transforms, Editor } from "slate";
import { ReactEditor } from "slate-react";
import { PluginAction } from "../../plugins/PluginAction";
import {
  getSelectionRootNodes,
  getPropertyValueAtCursor,
} from "../../editor/Editor";

export const TextAlignPluginAction: PluginAction = {
  action: ({ editor }, plugin, args) => {
    if (!args) {
      return;
    }
    const { selection } = editor;

    if (selection) {
      const nodes = getSelectionRootNodes(selection, editor);
      nodes.forEach((node) => {
        Transforms.setNodes(
          editor,
          { ...args },
          { at: ReactEditor.findPath(editor, node) }
        );
      });
    }
  },
  isActionActive: ({ editor }, plugin, args) => {
    if (args) {
      return args.textAlign === getTextAlign(editor);
    }
    return false;
  },
};

export const getTextAlign = (editor: ReactEditor) => {
  const textAlign = getPropertyValueAtCursor("textAlign", editor);
  const direction = getPropertyValueAtCursor("direction", editor);
  const isRtl = direction == "rtl";
  if (textAlign) {
    if (textAlign === "start" && isRtl) {
      return "right";
    } else if (textAlign === "start") {
      return "left";
    } else if (textAlign === "end" && isRtl) {
      return "left";
    } else if (textAlign === "end") {
      return "right";
    }
    return textAlign;
  }
  const { selection } = editor;
  if (selection) {
    const [node] = Editor.nodes(editor, {
      match: (node) => node.type === "aligned-block",
    });
    if (node && node[0].textAlign) {
      return node[0].textAlign;
    }
  }

  if (direction === "rtl") {
    return "right";
  } else {
    return "left";
  }
};

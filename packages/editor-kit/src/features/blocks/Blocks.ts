import { Editor, Transforms, Node, Path } from "slate";
import { ReactEditor } from "slate-react";
import { getActiveNode } from "../../editor/Editor";

export const toggleBlock = (editor: Editor, type: string) => {
  const isActive = isNodeActive(editor, type);

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : type
  });
};

export const isNodeActive = (editor: Editor, type: string) => {
  const { selection } = editor;
  if (!selection) {
    return false;
  }
  const [match] = Editor.nodes(editor, {
    at: selection,
    match: n => n.type === type
  });
  return !!match;
};

export const isBlockEmpty = (editor: Editor) => {
  const { selection } = editor;

  if (selection) {
    const [node] = Editor.node(editor, selection);
    return Node.string(node).length === 0;
  }
  return false;
};

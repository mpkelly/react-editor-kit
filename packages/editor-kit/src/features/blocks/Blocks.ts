import { Editor, Transforms, Node, Path } from "slate";

export const toggleBlock = (editor: Editor, type: string) => {
  const isActive = isNodeActive(editor, type);
  const { selection } = editor;
  if (!selection) {
    return;
  }
  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : type,
    at: selection.focus,
  });
};

export const isNodeActive = (editor: Editor, type: string) => {
  const { selection } = editor;
  if (!selection) {
    return false;
  }
  const [match] = Editor.nodes(editor, {
    at: selection,
    match: (n) => n.type === type,
  });
  return !!match;
};

export const isBlockEmpty = (editor: Editor) => {
  const { selection } = editor;

  if (selection) {
    const [node] = Editor.parent(editor, selection.focus);
    return Node.string(node).length === 0;
  }
  return false;
};

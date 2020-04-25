import { Editor, Transforms, Node, Range } from "slate";
import { ReactEditor } from "slate-react";
import { isDeleting } from "../../ui/Utils";

export const toggleBlock = (editor: Editor, type: string) => {
  const isActive = isNodeActive(editor, type);
  const { selection } = editor;
  if (!selection) {
    return;
  }
  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : type,
    autoFocus: true,
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

export const isDeletingBlockContents = (
  editor: ReactEditor,
  block: Node,
  event: React.KeyboardEvent
) => {
  if (isDeleting(event)) {
    const { selection } = editor;
    const length = Node.string(block).length;
    let selectAll = false;
    if (selection && Range.isExpanded(selection)) {
      const { anchor, focus } = selection;
      const distance = focus.offset - anchor.offset;
      selectAll = distance === length && length > 0;
    }
    if (length == 0 && block.children.length == 1) {
      event.preventDefault();
      return true;
    }
    if (selectAll) {
      Transforms.delete(editor, { at: selection as Range, hanging: false });
      return true;
    }
  }
  return false;
};

import { ReactEditor } from "slate-react";
import { isNodeActive } from "../blocks/Blocks";
import { Editor, Transforms, Range, Node } from "slate";

export const toggleInline = (
  editor: ReactEditor,
  type: string
): Node | undefined => {
  if (isNodeActive(editor, type)) {
    const [first] = Editor.nodes(editor, {
      match: n => n.type === type
    });
    Transforms.unwrapNodes(editor, { at: first[1] });
  } else {
    const { selection } = editor;
    const isCollapsed = selection && Range.isCollapsed(selection);
    const inline: Node = {
      type,
      children: isCollapsed ? [{ text: " " }] : []
    };
    if (isCollapsed) {
      Transforms.insertNodes(editor, inline);
      const [first] = Editor.nodes(editor, {
        match: n => n.type === type
      });
      Transforms.select(editor, first[1]);
    } else {
      Transforms.wrapNodes(editor, inline, {
        at: editor.selection as Range,
        split: true
      });
      Transforms.collapse(editor, { edge: "end" });
    }
    return inline;
  }
};

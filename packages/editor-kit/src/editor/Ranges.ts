import { Range, Editor } from "slate";
import { ReactEditor } from "slate-react";

export type EditorRange =
  | "character-before"
  | "character-after"
  | "word-before"
  | "word-after"
  | "line"
  | "line-before"
  | "line-after"
  | "block"
  | "block-before"
  | "block-after";

export type Unit = "character" | "word" | "line" | "block" | "offset";

const Delimiter = {
  character: "",
  word: " ",
  line: "\n",
  block: "",
  offset: ""
};

export const characterBefore = (editor: ReactEditor): Range | null => {
  return before(editor, "character");
};

export const characterAfter = (editor: ReactEditor): Range | null => {
  return after(editor, "character");
};

export const wordBefore = (editor: ReactEditor): Range | null => {
  return before(editor, "word");
};

export const wordAfter = (editor: ReactEditor): Range | null => {
  return after(editor, "word");
};

// export const line = (editor: ReactEditor): Range | null => {
//   return all(editor, "line");
// };

export const lineBefore = (editor: ReactEditor): Range | null => {
  return before(editor, "line");
};

export const lineAfter = (editor: ReactEditor): Range | null => {
  return after(editor, "line");
};

export const block = (editor: ReactEditor): Range | null => {
  return currentBlock(editor);
};

export const blockBefore = (editor: ReactEditor): Range | null => {
  return before(editor, "block");
};

export const blockAfter = (editor: ReactEditor): Range | null => {
  return after(editor, "block");
};

export const all = (editor: ReactEditor, unit: Unit) => {
  return currentBlock(editor);
};

export const currentBlock = (editor: ReactEditor): Range | null => {
  const { selection } = editor;
  if (selection && Range.isCollapsed(selection)) {
    const [node, path] = Editor.node(editor, selection);
    if (node) {
      const before = Editor.start(editor, path);
      const after = Editor.end(editor, path);
      return { anchor: before, focus: after };
    }
  }
  return null;
};

export const before = (editor: ReactEditor, unit: Unit): Range | null => {
  const { selection } = editor;
  if (selection && Range.isCollapsed(selection)) {
    const { anchor } = currentBlock(editor) as Range;

    if (unit === "block") {
      return { anchor, focus: selection.focus };
    }
    const text = Editor.string(editor, { anchor, focus: selection.focus });
    if (text) {
      const parts = text.split(Delimiter[unit]);
      const part = parts[parts.length - 1];

      const anchor = {
        path: selection.focus.path,
        offset: selection.focus.offset - part.length
      };
      const focus = {
        path: selection.focus.path,
        offset: selection.focus.offset
      };

      return { anchor, focus };
    }
  }
  return null;
};

export const after = (editor: ReactEditor, unit: Unit): Range | null => {
  const { selection } = editor;
  if (selection && Range.isCollapsed(selection)) {
    const { focus } = currentBlock(editor) as Range;
    if (unit === "block") {
      return { focus, anchor: selection.focus };
    }
    const text = Editor.string(editor, { anchor: selection.anchor, focus });
    if (text) {
      const parts = text.split(Delimiter[unit]);
      const part = parts[0];
      const focus = {
        path: selection.focus.path,
        offset: selection.focus.offset + part.length
      };
      return { anchor: selection.focus, focus };
    }
  }
  return null;
};

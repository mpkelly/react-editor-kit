import { Editor } from "slate";
import { MatchResult } from "../../editor/Matching";
import { deleteBackward } from "../../editor/Editor";
import { ReactEditor } from "slate-react";

export const toggleMark = (editor: Editor, type: string, value = true) => {
  const isActive = isMarkActive(editor, type);
  if (isActive) {
    Editor.removeMark(editor, type);
  } else {
    Editor.addMark(editor, type, value);
  }
};

export const isMarkActive = (editor: Editor, type: string) => {
  const marks = Editor.marks(editor);
  return marks ? marks[type] === true : false;
};

export const marks = (editor: Editor) => {
  const marks = editor.marks || {};
  return Object.keys(marks).map(key => ({ key, value: marks[key] }));
};

export const applyRegexMark = (
  editor: ReactEditor,
  result: MatchResult,
  mark: string,
  value = true
) => {
  const array = result.regexMatch as RegExpExecArray;
  const match = array[0];
  const text = array[2];
  deleteBackward(editor, match.length);
  editor.insertNode({ text, [mark]: value });
  editor.insertNode({ text: " " });
};

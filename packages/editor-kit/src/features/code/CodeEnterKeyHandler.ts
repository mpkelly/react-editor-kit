import { Editor, Range, Transforms } from "slate";
import { KeyHandler } from "../../plugins/KeyHandler";
import { lineBefore } from "../../editor/Ranges";
import { ReactEditor } from "slate-react";

export const CodeEnterKeyHandler: KeyHandler = {
  pattern: "enter",
  handle: ({ editor, element, elementType }, event) => {
    if (element && elementType === "code") {
      event.preventDefault();
      switch (element.lang) {
        case "CSS":
        case "TypeScript":
        case "JavaScript":
          jsEnterHandler(editor);
          break;
        default:
          editor.insertText("\n");
      }

      return true;
    }
    return false;
  },
};

const jsEnterHandler = (editor: ReactEditor) => {
  const range = lineBefore(editor);
  if (!range) {
    //At start of block
    editor.insertText("\n");
    return;
  }
  const line = Editor.string(editor, range as Range);
  let tabCount = countTabsAtStart(line);
  editor.insertText("\n");

  if (line.trim().endsWith("{")) {
    editor.insertText(createTabs(tabCount + 1));
    editor.insertText("\n");
    editor.insertText(createTabs(tabCount));
    editor.insertText("}");
    Transforms.move(editor, { distance: 2 + tabCount, reverse: true });
  } else {
    editor.insertText(createTabs(tabCount));
  }
};

const countTabsAtStart = (text: string) => {
  let count = 0;
  while (text.startsWith("\t")) {
    count++;
    text = text.substring(1);
  }
  return count;
};

const createTabs = (length: number) =>
  Array.from({ length })
    .map((i) => "\t")
    .join("");

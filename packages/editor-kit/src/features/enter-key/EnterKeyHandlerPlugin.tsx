import { Plugin } from "../../plugins/Plugin";
import { Editor, Transforms } from "slate";

export const EnterKeyHandler: Plugin = {
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>, editor: Editor) => {
    if (event.keyCode === 13) {
      //Enter key
      event.preventDefault();
      if (event.shiftKey) {
        editor.insertText("\n");
      } else {
        Transforms.insertNodes(editor, {
          type: "paragraph",
          children: [{ text: "\n" }]
        });
      }
      return true;
    }

    return false;
  }
};

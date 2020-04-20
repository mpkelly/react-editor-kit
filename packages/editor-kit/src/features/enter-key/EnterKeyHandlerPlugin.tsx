import { Plugin } from "../../plugins/Plugin";
import { Editor, Transforms } from "slate";

// Allows for soft-breaks when shift key is down when enter key is pressed.
export const EnterKeyHandler: Plugin = {
  name: "enter-key-handler",
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>, editor: Editor) => {
    if (event.keyCode === 13) {
      //Enter key
      if (event.shiftKey) {
        editor.insertText("\n");
        event.preventDefault();
      } else {
        Transforms.insertNodes(editor, {
          type: "paragraph",
          children: [{ text: "" }],
        });
      }
      event.stopPropagation();
      return true;
    }
    return false;
  },
};

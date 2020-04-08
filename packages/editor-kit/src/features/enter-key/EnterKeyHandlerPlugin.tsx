import { Plugin } from "../../plugins/Plugin";
import { Editor, Transforms } from "slate";

export const EnterKeyHandler: Plugin = {
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>, editor: Editor) => {
    if (event.keyCode === 13) {
      //Enter key
      if (event.shiftKey) {
        editor.insertText("\n");
        event.preventDefault();
        return true;
      }
    }

    return false;
  },
};

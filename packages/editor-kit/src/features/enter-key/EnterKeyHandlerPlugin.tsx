import { Plugin } from "../../plugins/Plugin";
import { ReactEditor } from "slate-react";
import { blockEvent } from "../../ui/Utils";

// Allows for soft-breaks when shift key is down when enter key is pressed.
export const EnterKeyHandlerPlugin: Plugin = {
  name: "enter-key-handler",
  order: 1000,
  onKeyDown: (
    event: React.KeyboardEvent<HTMLDivElement>,
    editor: ReactEditor
  ) => {
    if (event.keyCode === 13) {
      //Enter key
      if (event.shiftKey) {
        editor.insertText("\n");
        blockEvent(event);
        return true;
      }
    }
    return false;
  },
};

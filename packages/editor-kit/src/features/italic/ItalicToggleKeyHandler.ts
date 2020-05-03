import { KeyHandler } from "../../plugins/KeyHandler";
import { toggleMark } from "../marks/Marks";
import { blockEvent } from "../../ui/Utils";

export const ItalicToggleKeyHandler: KeyHandler = {
  pattern: "mod+i",
  handle: ({ editor }, event) => {
    toggleMark(editor, "italic");
    return blockEvent(event);
  },
};

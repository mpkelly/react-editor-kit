import { KeyHandler } from "../../plugins/KeyHandler";
import { toggleMark } from "../marks/Marks";
import { blockEvent } from "../../ui/Utils";

export const UnderlineToggleKeyHandler: KeyHandler = {
  pattern: "mod+u",
  handle: ({ editor }, event) => {
    toggleMark(editor, "underline");
    return blockEvent(event);
  },
};

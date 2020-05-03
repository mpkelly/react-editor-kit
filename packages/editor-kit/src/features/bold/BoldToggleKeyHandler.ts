import { toggleMark } from "../marks/Marks";
import { blockEvent } from "../../ui/Utils";
import { KeyHandler } from "../../plugins/KeyHandler";

export const BoldToggleKeyHandler: KeyHandler = {
  pattern: "mod+b",
  handle: (state, event) => {
    toggleMark(state.editor, "bold");
    return blockEvent(event);
  },
};

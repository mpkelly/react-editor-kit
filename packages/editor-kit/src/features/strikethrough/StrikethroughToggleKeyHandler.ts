import { toggleMark } from "../marks/Marks";
import { blockEvent } from "../../ui/Utils";
import { KeyHandler } from "../../plugins/KeyHandler";

export const StrikethroughToggleKeyHandler: KeyHandler = {
  pattern: "mod+y",
  handle: (state, event) => {
    toggleMark(state.editor, "strikethrough");
    return blockEvent(event);
  },
};

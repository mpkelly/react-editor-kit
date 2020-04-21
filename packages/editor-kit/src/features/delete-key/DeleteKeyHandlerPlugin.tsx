import { Plugin } from "../../plugins/Plugin";
import { Editor, Transforms } from "slate";
import { isBlockEmpty } from "../blocks/Blocks";

// Overrides default behaviour when two nodes are separated by
// an empty node. Deleting the empty node pulls the bottom node
// into the top node but if this plugin is enabled the empty
// node will be removed and the two remaining nodes stay as they were.
export const DeleteKeyHandlerPlugin: Plugin = {
  name: "delete-key-handler",
  order: 1000,
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>, editor: Editor) => {
    if (event.keyCode === 8) {
      //Backspace
      const { selection } = editor;
      if (selection && isBlockEmpty(editor)) {
        Transforms.removeNodes(editor, { at: selection.focus });
        event.stopPropagation();
        event.preventDefault();
        return true;
      }
    }
    return false;
  },
};

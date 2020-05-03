import { Plugin } from "../../plugins/Plugin";
import { BackspaceKeyHandler } from "./BackspaceKeyHandler";

// Overrides default behaviour when two nodes are separated by
// an empty node. Deleting the empty node pulls the bottom node
// into the top node but if this plugin is enabled the empty
// node will be removed and the two remaining nodes stay as they were.
export const BackspaceKeyPlugin: Plugin = {
  name: "backspace-handler",
  order: 1000,
  onKey: [BackspaceKeyHandler],
};

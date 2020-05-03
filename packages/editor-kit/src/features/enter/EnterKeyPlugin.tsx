import { Plugin } from "../../plugins/Plugin";
import { EnterKeyHandler } from "./EnterKeyHandler";

// Allows for soft-breaks when shift key is down when enter key is pressed.
export const EnterKeyPlugin: Plugin = {
  name: "enter-handler",
  order: 1000,
  onKey: [EnterKeyHandler],
};

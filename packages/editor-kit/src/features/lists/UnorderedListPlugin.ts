import { createListPlugin } from "./ListPlugin";
import { UnorderedListEditorStyle } from "./UnorderListEditorStyle";

export const UnorderedListPlugin = createListPlugin(
  "unordered-list",
  "ul",
  [{ pattern: /^\s?\*\s/g }, { pattern: /^\s?\-\s/g }],
  UnorderedListEditorStyle
);

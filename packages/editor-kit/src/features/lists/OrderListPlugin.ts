import { createListPlugin } from "./ListPlugin";
import { OrderedListEditorStyle } from "./OrderListEditorStyle";

export const OrderedListPlugin = createListPlugin(
  "ordered-list",
  "ol",
  [{ pattern: /^\s?[0-9]+\.\s/ }],
  OrderedListEditorStyle
);

import { Element } from "slate";

export type Layout = number[];

export const createLayout = (layout: Layout): Element => {
  const children: Element[] = layout.map((cell) => ({
    type: "layout-cell",
    width: (100 * cell) / layout.length,
    children: [{ type: "paragraph", children: [{ text: "" }] }],
  }));
  children[0].autoFocus = true;
  return { type: "layout", children };
};

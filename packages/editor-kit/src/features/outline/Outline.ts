import { Node } from "slate";

export const DefaultOutlineTypes = ["h1", "h2", "h3", "h4", "h5", "h6"];

export interface OutlineEntry {
  content: string;
  depth: number;
  node: Node;
}

export const createOutline = (
  nodes: Node[],
  types = DefaultOutlineTypes,
  flat = false
): OutlineEntry[] => {
  if (flat) {
    return nodes
      .filter((node) => types.includes(node.type))
      .map((node) => ({
        content: Node.string(node),
        depth: types.indexOf(node.type),
        node,
      }));
  } else {
    let outline: OutlineEntry[] = [];
    nodes.forEach((node) => {
      if (types.includes(node.type)) {
        outline.push({
          content: Node.string(node),
          depth: types.indexOf(node.type),
          node,
        });
      }
      if (node.children) {
        outline = outline.concat(createOutline(node.children, types, false));
      }
    });
    return outline;
  }
};

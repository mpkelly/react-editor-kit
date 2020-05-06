import { Node } from "slate";
import { ReactEditor } from "slate-react";
import { Plugin } from "../../plugins/Plugin";
import { getActiveNodeType, getActiveNode } from "../../editor/Editor";

export interface Constraints extends Plugin {
  constraints: EditorConstrains;
}

export type EditorConstrains = {
  [blockName: string]: string[];
};

export const DefaultConstraints = {
  //Accept nothing
  code: [],
  "list-item": ["link", "unordered-list", "ordered-list", "aligned-block"],
  //Accept only links
  blockquote: ["paragraph", "link"],
  //Accept everything except for tables and videos
  "table-cell": ["!table", "!video"],
  "todo-list": ["todo-list-item"],
  "todo-item": ["paragraph", "mention", "link"],
};

export const createConstrainsPlugin = (constraints: EditorConstrains) => {
  return {
    name: "constraints",
    constraints,
    withPlugin: (editor: ReactEditor) => {
      editor.isContentAllowed = (type: string, target?: Node) => {
        if (!target && !getActiveNode(editor)) {
          return false;
        }
        const targetConstraints = getConstraints(editor, constraints, target);
        if (!targetConstraints) {
          return true;
        }
        return isSupported(targetConstraints, type);
      };
      return editor;
    },
  };
};

const isSupported = (items: string[], item: string) => {
  const excluded = items
    .filter((item) => item.startsWith("!"))
    .map((item) => item.substring(1));
  if (excluded.length) {
    return !excluded.find((excluded) => excluded === item);
  } else {
    return items.includes(item);
  }
};

export const ConstraintsPlugin: Constraints = createConstrainsPlugin(
  DefaultConstraints
);

const getConstraints = (
  editor: ReactEditor,
  constraints: EditorConstrains,
  target?: Node
) => {
  const node: string = target ? target.type : getActiveNodeType(editor);
  if (!node) {
    return undefined;
  }
  return constraints[node];
};

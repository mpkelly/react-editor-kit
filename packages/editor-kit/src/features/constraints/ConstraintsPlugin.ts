import { Plugin } from "../../plugins/Plugin";
import { Node } from "slate";
import { ReactEditor } from "slate-react";
import { getActiveNodeType } from "../../editor/Editor";

export interface Constraints extends Plugin {
  data: {
    constraints: EditorConstrains;
  };
}

export type EditorConstrains = {
  // Omit block to accept all marks and nodes. Otherwise, specifiy names like "bold, italic, ..." for inclusive
  // mode or "!bold, !italic, ..." for exclusive mode
  [blockName: string]: {
    marks?: string[];
    nodes?: string[];
  };
};

export const DefaultConstraints = {
  //Accept nothing
  "code-block": {
    marks: [],
    nodes: []
  },
  //Accept only links
  quote: {
    nodes: ["link", "quote"]
  },
  //Accept everything except for tables
  "table-cell": {
    nodes: ["!table"]
  }
};

export const createConstrainsPlugin = (constraints: EditorConstrains) => {
  return {
    name: "constraints",
    withPlugin: (editor: ReactEditor) => {
      editor.isMarkSupported = (mark: string, target?: Node) => {
        const _constraints = getConstraints(editor, constraints, target);
        if (!_constraints || !_constraints.marks) {
          return true;
        }
        return isSupported(_constraints.marks, mark);
      };

      editor.isNodeSupported = (node: string, target?: Node) => {
        const _constraints = getConstraints(editor, constraints, target);
        if (!_constraints || !_constraints.nodes) {
          return true;
        }
        return isSupported(_constraints.nodes, node);
      };
      return editor;
    },
    data: {
      constraints
    }
  };
};

const isSupported = (items: string[], item: string) => {
  const excluded = items
    .filter(item => item.startsWith("!"))
    .map(item => item.substring(1));
  if (excluded.length) {
    return !excluded.find(excluded => excluded === item);
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
    return false;
  }
  return constraints[node];
};

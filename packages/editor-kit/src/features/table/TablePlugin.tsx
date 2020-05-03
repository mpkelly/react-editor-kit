import React from "react";
import { Editor, Transforms, Node } from "slate";
import { RenderElementProps } from "slate-react";
import { TableCellElement } from "./TableCellElement";
import { Plugin } from "../../plugins/Plugin";
import { TableElement } from "./TableElement";
import { isDeletingElementContents } from "../blocks/Elements";
import { TabledNamedTrigger } from "./TableNamedTrigger";
import { TableGlobalStyle } from "./TableGlobalStyle";
import { TableEditorStyle } from "./TableEditorStyle";
import { TableEnterKeyHandler } from "./TableEnterKeyHandle";
import { TableKeyDownHandler } from "./TableKeyDownHandler";

export interface TablePluginOptions {
  defaultTable: Node[];
}

export interface TablePlugin extends Plugin, TablePluginOptions {}

export const createTablePlugin = (options: TablePluginOptions): TablePlugin => {
  return {
    name: "table",
    ...options,
    withPlugin: (editor) => {
      const { normalizeNode } = editor;
      editor.normalizeNode = ([node, path]) => {
        if (node.type === "table-row") {
          for (const [child, childPath] of Node.children(editor, path)) {
            if (child.type !== "table-cell") {
              Transforms.removeNodes(editor, { at: childPath });
              Transforms.insertNodes(editor, wrapInCell(child), {
                at: childPath,
              });
            }
          }
        }
        return normalizeNode([node, path]);
      };
      return editor;
    },
    triggers: [TabledNamedTrigger],
    onKey: [TableEnterKeyHandler],
    onKeyDown: TableKeyDownHandler,
    renderElement: (props: RenderElementProps) => {
      return renderTable(props);
    },
    globalStyle: TableGlobalStyle,
    editorStyle: TableEditorStyle,
  };
};

const wrapInCell = (node: Node) => {
  return {
    type: "table-cell",
    children: [node],
  };
};

export const cell = (props: any = {}) => ({
  type: "table-cell",
  ...props,
  children: [{ type: "paragraph", children: [{ text: "" }] }],
});

export const DefaultTable = [
  {
    type: "table",
    headerRow: "true",
    children: [
      {
        type: "table-row",
        children: [cell({ autoFocus: true }), cell(), cell()],
      },
      {
        type: "table-row",
        children: [cell(), cell(), cell()],
      },
      {
        type: "table-row",
        children: [cell(), cell(), cell()],
      },
    ],
  },
];

export const TablePlugin = createTablePlugin({ defaultTable: DefaultTable });

export const renderTable = (props: RenderElementProps) => {
  const { element, attributes, children } = props;

  switch (element.type) {
    case "table":
      return <TableElement {...props} />;
    case "table-row":
      return (
        <tr {...attributes} className="rek-tr">
          {children}
        </tr>
      );
    case "table-cell":
      return <TableCellElement {...props} />;
    default:
      return undefined;
  }
};

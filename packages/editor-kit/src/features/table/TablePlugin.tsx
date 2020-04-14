import React from "react";
import { Editor, Transforms, Node } from "slate";
import { RenderElementProps, ReactEditor } from "slate-react";
import { TableCell } from "./TableCell";
import { Plugin, Trigger } from "../../plugins/Plugin";
import { clone, isDeleting } from "../../ui/Utils";
import { MatchResult } from "../../editor/Matching";
import { deleteBackward } from "../../editor/Editor";
import { Table } from "./Table";

export interface TablePluginOptions {
  defaultTable: Node[];
}

export const createTablePlugin = (options: TablePluginOptions): Plugin => {
  return {
    name: "table",
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
    triggers: [{ pattern: ":table", range: "block" }],
    onTrigger: (
      editor: ReactEditor,
      matches: MatchResult[],
      trigger: Trigger
    ) => {
      if (editor.isNodeSupported("table")) {
        if (trigger) {
          deleteBackward(editor, (trigger.pattern as String).length);
        }
        Transforms.insertNodes(editor, clone(options.defaultTable));
      }
    },
    renderElement: (props: RenderElementProps) => {
      return renderTable(props);
    },
    onKeyDown: (
      event: React.KeyboardEvent<HTMLDivElement>,
      editor: ReactEditor
    ) => {
      const [cell] = Editor.nodes(editor, {
        match: (n) => n.type === "table-cell",
      });
      if (!cell) {
        return;
      }
      if (event.keyCode === 13) {
        event.preventDefault();
        editor.insertText("\n");
        return true;
      }
      if (isDeleting(event) && Node.string(cell[0]).length == 0) {
        event.preventDefault();
        return true;
      }
    },
    globalStyles: () => GlobalStyle,
    editorStyles: () => EditorStyle,
  };
};

const wrapInCell = (node: Node) => {
  return {
    type: "table-cell",
    children: [node],
  };
};

export const DefaultTable = [
  {
    type: "table",
    headerRow: "true",
    children: [
      {
        type: "table-row",
        children: [
          {
            type: "table-cell",
            children: [{ text: "" }],
          },
          {
            type: "table-cell",
            children: [{ text: "" }],
          },
        ],
      },
      {
        type: "table-row",
        children: [
          {
            type: "table-cell",
            children: [{ text: "" }],
          },
          {
            type: "table-cell",
            children: [{ text: "" }],
          },
        ],
      },
    ],
  },
];

export const TablePlugin = createTablePlugin({ defaultTable: DefaultTable });

export const renderTable = (props: RenderElementProps) => {
  const { element, attributes, children } = props;
  switch (element.type) {
    case "table":
      return <Table {...props} />;
    case "table-row":
      return (
        <tr {...attributes} className="rek-tr">
          {children}
        </tr>
      );
    case "table-cell":
      return <TableCell {...props} />;
    default:
      return undefined;
  }
};

const GlobalStyle = `
  div.rek-table-cell-menu {
    display:flex;
    align-items:center;
    justify-content:center;          
    height:18px;
    width:18px;
    border-radius:2px;
    background-color: var(--content-background);
    border: 2px solid var(--divider-color);
    cursor:pointer;    
  }

  .rek-table-cell-menu {
    position:absolute;
    top:2px;
    right:2px;
  }

  .rek-table-cell-menu.dropdown-icon.svg-icon {
    transform:scale(.8);
  }

  .rek-table-settings {
    display:flex;
    flex-direction:column;
    padding:8px;
    > *  {
      margin-top:4px;
      margin-bottom:4px;
    }
  }
`;

const EditorStyle = `
  .rek-table {
    width:100%;
    margin:0 auto;  
    table-layout: fixed;
    border-collapse: collapse;
    border: 1px solid var(--divider-color);
    :focus {
      outline:none;
    }
  }
            
  .rek-tr {
    border: 1px solid var(--divider-color);
  }

  .rek-header-row  .rek-tr:first-child {
    background-color: #f3f5f7;
  }

  .rek-header-column  .rek-td:first-child {
    background-color: #f3f5f7;
  }

  .rek-table.rek-borderless,
  .rek-table.rek-borderless tr,
  .rek-table.rek-borderless td {
    border-color: transparent;
  }

  .rek-td {
    position:relative;          
    border: 1px solid var(--divider-color);
    padding:4px 8px;
    padding-right: 24px;
    height:40px;
    width:2%;
    p {
      margin:0;
    }              
  } 
`;

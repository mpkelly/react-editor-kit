import React from "react";
import { Editor, Transforms, Node, Range } from "slate";
import { RenderElementProps, ReactEditor } from "slate-react";
import { TableCell } from "./TableCell";
import { Plugin, Trigger } from "../../plugins/Plugin";
import { clone, isDeleting } from "../../ui/Utils";
import { MatchResult } from "../../editor/Matching";
import { deleteBackward, getActiveNode } from "../../editor/Editor";
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
        if (event.shiftKey) {
          editor.insertText("\n");
        } else {
          // Default behaviour would add a new table cell to the parent row
          // so insert new paragraph instead
          Transforms.insertNodes(editor, {
            type: "paragraph",
            children: [{ text: "" }],
          });
        }
        event.preventDefault();
        return true;
      }
      if (isDeleting(event)) {
        // Overrides default behaviour which would some times let the user
        // delete the table-cell and break the table
        const { selection } = editor;
        const length = Node.string(cell[0]).length;
        let selectAll = false;
        if (selection && Range.isExpanded(selection)) {
          const { anchor, focus } = selection;
          const distance = focus.offset - anchor.offset;
          selectAll = distance === length && length > 0;
        }
        if (length == 0 && cell[0].children.length == 1) {
          event.preventDefault();
          return true;
        }
        if (selectAll) {
          Transforms.delete(editor, { at: selection as Range, hanging: false });
          event.preventDefault();
          return true;
        }
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
    transform:scale(.8);
  }

  .rek-table-settings {
    display:flex;
    flex-direction:column;
    padding:8px;
    > * {
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

  .rek-header-row .rek-tr:first-child {
    background-color: #f3f5f7;
  }

  .rek-header-column .rek-td:first-child {
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

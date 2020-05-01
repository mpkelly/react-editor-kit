import React from "react";
import { Editor, Transforms, Node } from "slate";
import { RenderElementProps, ReactEditor } from "slate-react";
import { TableCell } from "./TableCell";
import { Plugin, Trigger } from "../../plugins/Plugin";
import { clone } from "../../ui/Utils";
import { MatchResult } from "../../editor/Matching";
import { deleteBackward } from "../../editor/Editor";
import { Table } from "./Table";
import { isDeletingBlockContents } from "../blocks/Blocks";

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

      // Overrides default behaviour which would some times let the user
      // delete the table-cell and break the table
      if (isDeletingBlockContents(editor, cell[0], event)) {
        event.preventDefault();
        return true;
      }
      return false;
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
  .rek-table-wrapper {
    padding:20px;
    display:flex;
    flex-direction:column;
    padding-right:0;
  }

  .rek-table-wrapper-body {  
    position:relative;
    display:flex;
    padding-right:16px;
  }

  .rek-table-right {    
    position:absolute;
    right:0;
    top: -16px;
    width: 16px;
    border-top-right-radius: 12px;
    height: calc(100% + 16px);
    background-color: var(--gray-light2-color);
    display:flex;
    justify-content:center;
    align-items:center;    
    cursor:pointer;
    * {
      display:none;
      font-size:16px;
      width:18px;
      height:18px;
      color:var(--button-color);
    }
    &:hover {
      background-color: var(--focus-color);
      * {
        display:initial;
      }
    }    
  }
  .rek-table-bottom {
    height: 16px;
    width: calc(100% + 16px);
    margin-left: -16px;
    background-color: var(--gray-light2-color);
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
    display:flex;
    justify-content:center;
    align-items:center;    
    cursor:pointer;
    * {
      display:none;
      font-size:16px;
      width:18px;
      height:18px;
      color:var(--button-color);
    }
    &:hover {
      background-color: var(--focus-color);
      * {
        display:initial;
      }
    }    
  }

  .rek-table-button {
    position: absolute;
    left:-17px;
    top:-17px;
    width:16px;
    height:16px;
    background-color: var(--gray-light2-color);   
    border-top-left-radius: 12px;
    .active,
    &:hover {
      background-color: var(--focus-color);
    }
    cursor:pointer;
  }

  .rek-table-row-button {
    width: 16px;
    height: 100%;
    top: 0;
    left: -17px;
    position: absolute;
    background-color: var(--gray-light2-color);    
    .active,
    &:hover {
      background-color: var(--focus-color);
    }
    cursor:pointer;
  }

  .rek-table-column-button {
    width: 100%;
    height: 16px;
    top: -17px;
    left: 0;
    position: absolute;
    background-color: var(--gray-light2-color);    
    .active,
    &:hover {
      background-color: var(--focus-color);
    }
    cursor:pointer;
  }

  .rek-table-column-insert {
    width: 1px;
    height: 28px;
    top: -28px;
    right: -1px;
    position: absolute;
    display:flex;
    justify-content:center;
  }

  .rek-table-column-insert-button {
    display:flex;
    justify-content:center;
    align-items: center;
    width: 16px;
    height: 16px;
    flex-shrink:0; 
    cursor:pointer; 
    &:hover {
      .rek-table-column-insert-button-inner {
        width: 20px;
        height: 20px;
        top:-10px;
        * {
          display:block;          
        }
      }
    }
    .rek-table-column-insert-button-inner {
      position:absolute;
      top:0;
      width: 3px;
      height: 3px;
      display:flex;
      align-items:center;
      justify-content:center;
      flex-shrink:0;
      background-color: var(--divider-color);
      border-radius:50%;
      * {
        display:none;
      }
    }
  }

  .rek-table-column-insert-divider {
    width: 1px;
    height: 16px;
    bottom: 1px;
    position: absolute;
    background-color: var(--divider-color);
  }

  .rek-table-row-insert {
    width: 28px;
    height: 1px;
    left: -28px;
    bottom: -1px;
    position: absolute;
    display:flex;
    align-items:center;
  }

  .rek-table-row-insert-button {
    display:flex;
    align-items:center;
    width: 16px;
    height: 16px;
    flex-shrink:0; 
    cursor:pointer; 

    &:hover {
      .rek-table-row-insert-button-inner {
        width: 20px;
        height: 20px;
        top:-10px;
        left:-10px;
        * {
          display:block;
        }
      }
    }

    .rek-table-row-insert-button-inner {
      position:absolute;
      top:0;
      width: 3px;
      height: 3px;
      display:flex;
      align-items:center;
      justify-content:center;
      flex-shrink:0;
      background-color: var(--divider-color);
      border-radius:50%;
      * {
        display:none;
      }
    }
  }

  .rek-table-row-insert-divider {
    height: 1px;
    width: 16px;
    right: 1px;
    position: absolute;
    background-color: var(--divider-color);
  }

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
    position:relative;
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

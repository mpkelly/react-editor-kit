import { Editor, Transforms, Element } from "slate";
import { ReactEditor } from "slate-react";
import { useEditorKit } from "../../editor/EditorKit";
import { cell } from "./TablePlugin";
import { getAncestor } from "../../editor/Editor";

export const useTables = () => {
  const { editor } = useEditorKit();

  const addColumn = (element: Element) => {
    const [row, rowPath] = findRow(editor, element);
    const index = row.children.indexOf(element);
    const [table] = Editor.parent(editor, rowPath);
    table.children.forEach((row) => {
      const path = ReactEditor.findPath(editor, row.children[index]);
      path[path.length - 1]++;
      Transforms.insertNodes(editor, cell(), { at: path });
    });
  };

  const addRow = (element: Element) => {
    const [row, rowPath] = findRow(editor, element);
    rowPath[rowPath.length - 1]++;
    const children = Array.from({ length: row.children.length }).map(() =>
      cell()
    );
    const newRow = {
      type: "table-row",
      children,
    };
    Transforms.insertNodes(editor, newRow, { at: rowPath });
  };

  const deleteRow = (element: Element) => {
    const [, rowPath] = findRow(editor, element);
    rowPath[rowPath.length - 1];
    Transforms.delete(editor, { at: rowPath });
  };

  const deleteColumn = (element: Element) => {
    const [row, rowPath] = findRow(editor, element);
    const index = row.children.indexOf(element);
    const [table] = Editor.parent(editor, rowPath);
    table.children.forEach((row) => {
      const path = ReactEditor.findPath(editor, row.children[index]);
      path[path.length - 1];
      Transforms.delete(editor, { at: path });
    });
  };

  return { addColumn, addRow, deleteColumn, deleteRow };
};

const findRow = (editor: ReactEditor, element: Element) => {
  const node = getAncestor(editor, element, 1);
  return Editor.node(editor, ReactEditor.findPath(editor, node as Element));
};

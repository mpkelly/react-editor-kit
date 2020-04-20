import React, { useState, useCallback, useRef, useMemo } from "react";
import { ReactEditor, RenderElementProps } from "slate-react";
import { Editor, Transforms, Element, Path, Ancestor } from "slate";
import { useEditorKit } from "../../editor/EditorKit";
import { usePlugin } from "../../plugins/usePlugin";
import { Labels } from "../i18n/LabelsPlugin";
import { block } from "../../ui/Utils";

export const useTables = (props: RenderElementProps) => {
  const { element } = props;
  const { editor } = useEditorKit();
  const [showMenu, setShowMenu] = useState(false);
  const position = useRef({ top: 0, left: 0 });
  const { data: labels } = usePlugin("labels") as Labels;

  const handleAddColumn = useCallback(() => {
    addColumn(editor, element);
  }, [element]);

  const handleDeleteColumn = useCallback(() => {
    deleteColumn(editor, element);
  }, [element]);

  const handleAddRow = useCallback(() => {
    addRow(editor, element);
  }, [element]);

  const handleDeleteRow = useCallback(() => {
    deleteRow(editor, element);
  }, [element]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      block(event);
      position.current = {
        top: event.clientY,
        left: event.clientX,
      };
      setShowMenu((show) => !show);
    },
    []
  );

  const listItems = useMemo(
    () => [
      {
        text: labels.addColumn,
        onClick: handleAddColumn,
      },
      {
        text: labels.deleteColumn,
        onClick: handleDeleteColumn,
      },
      {
        text: labels.addRow,
        onClick: handleAddRow,
      },
      {
        text: labels.deleteRow,
        onClick: handleDeleteRow,
      },
    ],
    [element]
  );

  const [cell] = Editor.nodes(editor, {
    match: (n) => n.type === "table-cell",
  });
  const active = cell && cell[0] === element;

  return { active, handleClick, showMenu, position, listItems };
};

const addColumn = (editor: ReactEditor, element: Element) => {
  const [row, rowPath] = findRow(editor, element);
  const index = row.children.indexOf(element);
  const [table] = Editor.parent(editor, rowPath);
  table.children.forEach((row) => {
    const path = ReactEditor.findPath(editor, row.children[index]);
    path[path.length - 1]++;
    Transforms.insertNodes(
      editor,
      {
        type: "table-cell",
        children: [{ text: "" }],
      },
      { at: path }
    );
  });
};

const deleteColumn = (editor: ReactEditor, element: Element) => {
  const [row, rowPath] = findRow(editor, element);
  const index = row.children.indexOf(element);
  const [table] = Editor.parent(editor, rowPath);
  table.children.forEach((row) => {
    const path = ReactEditor.findPath(editor, row.children[index]);
    path[path.length - 1];
    Transforms.delete(editor, { at: path });
  });
};

const addRow = (editor: ReactEditor, element: Element) => {
  const [row, rowPath] = findRow(editor, element);
  rowPath[rowPath.length - 1]++;
  const children = Array.from({ length: row.children.length }).map(() => ({
    type: "table-cell",
    children: [{ text: "" }],
  }));

  const newRow = {
    type: "table-row",
    children,
  };
  Transforms.insertNodes(editor, newRow, { at: rowPath });
};

const deleteRow = (editor: ReactEditor, element: Element) => {
  const [, rowPath] = findRow(editor, element);
  rowPath[rowPath.length - 1];
  Transforms.delete(editor, { at: rowPath });
};

const findRow = (editor: ReactEditor, element: Element): [Ancestor, Path] => {
  const path = ReactEditor.findPath(editor, element);
  const row = Editor.parent(editor, path)[0];
  const rowPath = ReactEditor.findPath(editor, row);
  return [row, rowPath];
};

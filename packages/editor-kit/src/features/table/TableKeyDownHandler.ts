import { Editor } from "slate";
import { EditorState } from "../../editor/EditorState";
import { isDeletingElementContents } from "../elements/Elements";
import { isAtStartOfNode } from "../../editor/Editor";

export const TableKeyDownHandler = (
  event: React.KeyboardEvent,
  { editor }: EditorState
) => {
  const [cell] = Editor.nodes(editor, {
    match: (node) => node.type === "table-cell",
  });
  if (!cell) {
    return;
  }

  console.log(cell, isDeletingElementContents(editor, cell[0], event));
  // Overrides default behaviour which would some times let the user
  // delete the table-cell and break the table
  if (isDeletingElementContents(editor, cell[0], event)) {
    event.preventDefault();
    return true;
  }
  //Block backspace at start of node
  if (event.keyCode == 8 && isAtStartOfNode(editor)) {
    event.preventDefault();
    return true;
  }
  return false;
};

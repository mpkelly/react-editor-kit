import { Editor } from "slate";
import { EditorState } from "../../editor/EditorState";
import { isDeletingElementContents } from "../elements/Elements";

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

  // Overrides default behaviour which would some times let the user
  // delete the table-cell and break the table
  if (isDeletingElementContents(editor, cell[0], event)) {
    event.preventDefault();
    return true;
  }
  return false;
};

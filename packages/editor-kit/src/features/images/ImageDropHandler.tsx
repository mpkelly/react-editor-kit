import { EditorState } from "../../editor/EditorState";
import { insertImage } from "./ImagePlugin";
import { ReactEditor } from "slate-react";

export const imageDropHandler = (
  event: React.DragEvent,
  { editor }: EditorState
): boolean => {
  const data: string = event.dataTransfer.getData("text/html");
  const selection = getSelection();
  if (selection && selection.focusNode) {
    const range = ReactEditor.findEventRange(editor, event);
    if (range) {
      if (data.includes("src=")) {
        const result = data.match(/src="?([^"\s]+)"?\s*/);
        if (result) {
          insertImage(editor, result[1], range);
          return true;
        }
      }
    }
  }

  return false;
};

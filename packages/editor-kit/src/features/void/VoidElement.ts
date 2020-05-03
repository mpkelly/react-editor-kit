import { ReactEditor } from "slate-react";

/**
 * Tell Slate that an Element is void
 */
export const registerVoid = (
  editor: ReactEditor,
  type: string
): ReactEditor => {
  const { isVoid } = editor;
  editor.isVoid = (element) => {
    return element.type === type ? true : isVoid(element);
  };
  return editor;
};

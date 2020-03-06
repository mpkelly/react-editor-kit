import { Node, Editor, Transforms } from "slate";
import { useEditorKit } from "./EditorKit";
import { useCallback } from "react";
import { ReactEditor } from "slate-react";

export const useEdit = () => {
  const { editor } = useEditorKit();

  const deleteNode = useCallback((node: Node) => {
    Transforms.delete(editor, { at: ReactEditor.findPath(editor, node) });
  }, []);

  return { deleteNode };
};

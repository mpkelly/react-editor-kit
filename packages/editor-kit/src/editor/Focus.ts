import { Node, Path } from "slate";
import { useEditorKit } from "./EditorKit";
import { ReactEditor } from "slate-react";
import { useState, useEffect } from "react";

export const useFocused = (element: Node) => {
  const { editor } = useEditorKit();
  const { selection } = editor;
  const [focus, setFocus] = useState({
    isFocused: false,
    isFocusedWithin: false
  });
  useEffect(() => {
    const path = ReactEditor.findPath(editor, element);
    let isFocused = false;
    let isFocusedWithin = false;
    if (selection) {
      const { focus } = selection;
      isFocusedWithin = Path.isDescendant(focus.path, path);
      isFocused = Path.equals(focus.path, path);
    }
    setFocus({ isFocused, isFocusedWithin });
  }, [element, selection]);

  return { ...focus };
};

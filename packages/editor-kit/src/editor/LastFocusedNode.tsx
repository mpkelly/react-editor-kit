import React, { useEffect, useState } from "react";
import { Point, Range, Editor, Node } from "slate";
import { ReactEditor } from "slate-react";
import { getActiveNodeType } from "./Editor";
import { clone } from "../ui/Utils";

export const useLastFocused = (editor: ReactEditor) => {
  const [state, setState] = useState<State>({
    node: null,
    point: null,
    selection: null
  });
  const { selection } = editor;
  const current = getActiveNodeType(editor);

  useEffect(() => {
    if (!ReactEditor.isFocused(editor)) {
      return;
    }
    if (!selection) {
      return;
    }
    if (current) {
      const point = selection.focus;
      const [node] = Editor.parent(editor, point);
      setState({ node, point, selection: clone(selection) });
    }
  }, [current, selection]);

  return state;
};

interface State {
  node: Node | null;
  point: Point | null;
  selection: Range | null;
}

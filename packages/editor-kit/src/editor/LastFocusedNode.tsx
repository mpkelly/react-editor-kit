import { useEffect, useState } from "react";
import { Point, Range, Editor, Element } from "slate";
import { ReactEditor } from "slate-react";
import { getActiveNodeType } from "./Editor";
import { clone } from "../ui/Utils";

export const useLastFocused = (editor: ReactEditor) => {
  const [state, setState] = useState<LastFocusedState>({
    element: undefined,
    point: undefined,
    selection: undefined,
  });
  const current = getActiveNodeType(editor);

  useEffect(() => {
    if (!ReactEditor.isFocused(editor)) {
      return;
    }
    const { selection } = editor;
    if (!selection) {
      return;
    }
    if (current) {
      const point = selection.focus;
      const [element] = Editor.parent(editor, point);
      if (
        state.element === element &&
        state.point &&
        Point.equals(state.point, point)
      ) {
        return;
      }
      setState({
        element: element,
        point,
        selection: clone(selection),
      });
    }
  }, [current, state, editor.operations]);

  return state;
};

export interface LastFocusedState {
  element?: Element;
  point?: Point;
  selection?: Range | null;
}

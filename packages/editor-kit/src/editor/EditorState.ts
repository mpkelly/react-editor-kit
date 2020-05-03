import { ReactEditor } from "slate-react";
import { Element, Point, Range, Node } from "slate";
import { LastFocusedState } from "./LastFocusedNode";

export interface EditorState {
  editor: ReactEditor;
  element?: Element;
  elementType?: string;
  point?: Point;
  isElementEmpty: boolean;
  selection?: Range;
  isSelectionCollapsed: boolean;
  isSelectionExpanded: boolean;
}

export const createEditorState = (
  last: LastFocusedState,
  editor: ReactEditor
): EditorState => {
  const { element, point, selection } = last;

  let isSelectionExpanded = false;
  let isSelectionCollapsed = true;
  if (selection) {
    isSelectionExpanded = Range.isExpanded(selection);
    isSelectionCollapsed = Range.isCollapsed(selection);
  }

  let isElementEmpty = true;

  if (element) {
    isElementEmpty = Node.string(element).length == 0;
  }
  let elementType: string | undefined = undefined;

  if (element) {
    elementType = element.type;
  }

  return {
    editor,
    element,
    elementType,
    point,
    selection,
    isElementEmpty,
    isSelectionExpanded,
    isSelectionCollapsed,
  };
};

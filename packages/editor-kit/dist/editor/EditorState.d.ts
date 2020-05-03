import { ReactEditor } from "slate-react";
import { Element, Point, Range } from "slate";
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
export declare const createEditorState: (last: LastFocusedState, editor: ReactEditor) => EditorState;

import { Point, Range, Element } from "slate";
import { ReactEditor } from "slate-react";
export declare const useLastFocused: (editor: ReactEditor) => LastFocusedState;
export interface LastFocusedState {
    element?: Element;
    point?: Point;
    selection?: Range | null;
}

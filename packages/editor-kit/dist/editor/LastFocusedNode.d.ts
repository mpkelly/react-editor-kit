import { Point, Range, Node } from "slate";
import { ReactEditor } from "slate-react";
export declare const useLastFocused: (editor: ReactEditor) => State;
interface State {
    node: Node | null;
    point: Point | null;
    selection: Range | null;
}
export {};

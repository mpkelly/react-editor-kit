/// <reference types="react" />
import { Node } from "slate";
export interface TooltipProps {
    element: Node;
    text?: string;
}
export declare const Tooltip: (props: TooltipProps) => JSX.Element | null;

import { ReactNode } from "react";
import { Node } from "slate";
import { Location } from "./Popups";
export interface ToolipContentProps {
    text?: string;
    component?: ReactNode;
    location?: Location;
}
export interface TooltipProps extends ToolipContentProps {
    element: Node;
}
export declare const Tooltip: (props: TooltipProps) => JSX.Element;
export interface TextTooltipProps {
    text: string;
}
export declare const TextTooltip: (props: TextTooltipProps) => JSX.Element;

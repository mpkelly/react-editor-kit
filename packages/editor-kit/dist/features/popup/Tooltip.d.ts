import { ReactNode } from "react";
import { Node } from "slate";
import { Location, Offsets } from "./Popups";
export interface TooltipContentProps {
    tooltipText?: string;
    tooltipComponent?: ReactNode;
    tooltipLocation?: Location;
    tooltipOffsets?: Offsets;
}
export interface TooltipProps extends TooltipContentProps {
    node?: Node;
    element?: HTMLElement;
}
export declare const Tooltip: (props: TooltipProps) => JSX.Element;
export interface TextTooltipProps {
    text: string;
}
export declare const TextTooltip: (props: TextTooltipProps) => JSX.Element;

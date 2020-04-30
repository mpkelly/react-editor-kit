/// <reference types="react" />
import { ActionChildProps } from "../actions/Action";
import { TooltipContentProps } from "../popup/Tooltip";
export interface IconProps extends TooltipContentProps {
    className: string;
    ligature?: string;
    onRef?(node?: HTMLElement | null): void;
}
export interface IconButtonProps extends ActionChildProps, IconProps {
}
export declare const IconButton: (props: IconButtonProps) => JSX.Element;

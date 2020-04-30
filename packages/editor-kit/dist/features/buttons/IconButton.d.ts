/// <reference types="react" />
import { ActionChildProps } from "../actions/Action";
import { TooltipContentProps } from "../popup/Tooltip";
import { EditorIcon } from "../icons/Icon";
export interface IconProps extends TooltipContentProps {
    className?: string;
    ligature?: string;
    icon?: EditorIcon;
    onRef?(node?: HTMLElement | null): void;
}
export interface IconButtonProps extends ActionChildProps, IconProps {
}
export declare const IconButton: (props: IconButtonProps) => JSX.Element;

/// <reference types="react" />
import { IconProps } from "../buttons/IconButton";
import { TooltipContentProps } from "../popup/Tooltip";
export interface BlockButtonProps extends IconProps, TooltipContentProps {
    type: string;
}
export declare const BlockButton: (props: BlockButtonProps) => JSX.Element;

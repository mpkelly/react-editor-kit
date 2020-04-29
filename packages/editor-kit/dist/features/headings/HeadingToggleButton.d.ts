/// <reference types="react" />
import { IconProps } from "../buttons/IconButton";
import { TooltipContentProps } from "../popup/Tooltip";
export interface HeadingToggleButtonProps extends IconProps, TooltipContentProps {
    heading?: string;
}
export declare const HeadingToggleButton: (props: HeadingToggleButtonProps) => JSX.Element;

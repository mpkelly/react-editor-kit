/// <reference types="react" />
import { IconProps } from "../buttons/IconButton";
import { TooltipContentProps } from "../popup/Tooltip";
export interface MarkButtonProps extends IconProps, TooltipContentProps {
    type: string;
    value?: any;
}
export declare const MarkButton: (props: MarkButtonProps) => JSX.Element;

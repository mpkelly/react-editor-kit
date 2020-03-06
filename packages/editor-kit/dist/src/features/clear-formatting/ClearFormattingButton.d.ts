/// <reference types="react" />
import { IconProps } from "../buttons/IconButton";
export interface ClearFormattingButtonProps extends IconProps {
    formats?: string[];
}
export declare const ClearFormattingButton: (props: ClearFormattingButtonProps) => JSX.Element;

/// <reference types="react" />
import { IconProps } from "../buttons/IconButton";
export interface MarkButtonProps extends IconProps {
    type: string;
    value?: any;
}
export declare const MarkButton: (props: MarkButtonProps) => JSX.Element;

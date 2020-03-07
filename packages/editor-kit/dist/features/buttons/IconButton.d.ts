/// <reference types="react" />
import { ActionChildProps } from "../actions/Action";
export interface IconProps {
    className: string;
    ligature?: string;
}
export interface IconButtonProps extends ActionChildProps, IconProps {
}
export declare const IconButton: (props: IconButtonProps) => JSX.Element;

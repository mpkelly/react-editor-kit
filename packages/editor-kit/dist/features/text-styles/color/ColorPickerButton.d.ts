/// <reference types="react" />
import { IconProps } from "../../buttons/IconButton";
import { Color } from "./ColorPickerAction";
export interface ColorPickerButtonProps extends IconProps {
    colors?: Color[][];
}
export declare const ColorPickerButton: (props: ColorPickerButtonProps) => JSX.Element;

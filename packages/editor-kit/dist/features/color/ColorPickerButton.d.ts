import { FunctionComponent } from "react";
import { IconProps } from "../buttons/IconButton";
import { Color } from "./ColorPickerAction";
import { TooltipContentProps } from "../popup/Tooltip";
export interface ColorPickerButtonProps extends IconProps, TooltipContentProps {
    colors?: Color[][];
}
export declare const ColorPickerButton: FunctionComponent<ColorPickerButtonProps>;
export declare const DefaultColors: Color[][];

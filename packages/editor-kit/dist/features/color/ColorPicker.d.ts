/// <reference types="react" />
import { Color } from "./ColorPickerAction";
export interface ColorPickerProps {
    color: Color;
    backgroundColor: Color;
    onColorChange(color: Color | null): void;
    onBackgroundColorChange(color: Color | null): void;
    colors?: Color[][];
}
export declare const ColorPicker: (props: ColorPickerProps) => JSX.Element;
export interface ColorPanelProps {
    color: any;
    onChange(color: Color | null): void;
    colors: Color[][];
    title: string;
}
export declare const getCssColor: (color: Color) => string;

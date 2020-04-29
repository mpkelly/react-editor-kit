import React, { FunctionComponent } from "react";
export interface ColorPickerActionProps {
    children: React.ReactNode;
    colors?: Color[][];
}
export declare type HexColor = string;
export declare type HslaColor = {
    h: number;
    s: number;
    l: number;
    a?: number;
};
export declare type RgbaColor = {
    r: number;
    g: number;
    b: number;
    a?: number;
};
export declare type Color = HexColor | HslaColor | RgbaColor | "transparent";
export declare const ColorPickerAction: FunctionComponent<ColorPickerActionProps>;

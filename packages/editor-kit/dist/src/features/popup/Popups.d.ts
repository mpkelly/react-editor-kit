import { CSSProperties } from "react";
export declare type Location = "inside-start" | "inside-end" | "inside-top" | "inside-bottom" | "start" | "end" | "top" | "bottom";
export interface Offsets {
    h?: number;
    v?: number;
}
export declare const getPosition: (bounds: ClientRect, anchor: ClientRect, location?: Location, fixed?: boolean, offsets?: Offsets) => CSSProperties;
export declare const getAbsolutePosition: (bounds: ClientRect, anchor: ClientRect, position?: Location, offsets?: {
    h?: number | undefined;
    v?: number | undefined;
}) => CSSProperties;
export declare const getFixedPosition: (bounds: ClientRect, anchor: ClientRect, position?: Location, offsets?: {
    h?: number | undefined;
    v?: number | undefined;
}) => CSSProperties;

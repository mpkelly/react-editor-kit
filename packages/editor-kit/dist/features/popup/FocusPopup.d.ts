import React from "react";
import { Element } from "slate";
import { Location, Offsets } from "./Popups";
export interface FocusPopupProps {
    element: Element;
    location?: Location;
    children: React.ReactNode;
    offsets?: Offsets;
    fixed?: boolean;
    show?: boolean;
}
export declare const FocusPopup: React.MemoExoticComponent<(props: FocusPopupProps) => JSX.Element>;

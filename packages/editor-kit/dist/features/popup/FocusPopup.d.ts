import React from "react";
import { Element } from "slate";
import { Location, Offsets } from "./Popups";
export interface FocusPopupProps {
    element: Element;
    location?: Location;
    children: JSX.Element;
    offsets?: Offsets;
    fixed?: boolean;
}
export declare const FocusPopup: React.MemoExoticComponent<(props: FocusPopupProps) => JSX.Element | null>;

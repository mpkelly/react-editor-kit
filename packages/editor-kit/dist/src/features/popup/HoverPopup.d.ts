import React from "react";
import { Node } from "slate";
import { Location, Offsets } from "./Popups";
export interface HoverPopupProps {
    element: Node;
    location?: Location;
    children: JSX.Element;
    fixed?: boolean;
    hideWhenFocusedWithin?: boolean;
    offsets?: Offsets;
}
export declare const HoverPopup: React.MemoExoticComponent<(props: HoverPopupProps) => JSX.Element>;

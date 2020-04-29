import React from "react";
import { Node } from "slate";
import { Location, Offsets } from "./Popups";
export interface HoverPopupProps {
    node?: Node;
    element?: HTMLElement;
    location?: Location;
    children: React.ReactNode;
    fixed?: boolean;
    hideWhenFocusedWithin?: boolean;
    offsets?: Offsets;
}
export declare const HoverPopup: React.MemoExoticComponent<(props: HoverPopupProps) => JSX.Element>;

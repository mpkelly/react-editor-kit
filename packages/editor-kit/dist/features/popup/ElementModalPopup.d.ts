import React from "react";
import { Element } from "slate";
import { Location, Offsets } from "./Popups";
export interface ModalPopupProps {
    element: Element;
    children: React.ReactNode;
    show: boolean;
    location?: Location;
    offsets?: Offsets;
    onClickOutside?(event?: React.MouseEvent<HTMLElement, MouseEvent>): void;
}
export declare const ModalPopup: (props: ModalPopupProps) => JSX.Element;

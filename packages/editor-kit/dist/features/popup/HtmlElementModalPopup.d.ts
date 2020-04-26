import React from "react";
import { Location, Offsets } from "./Popups";
export interface ModalPopupProps {
    element: HTMLElement | null;
    children: React.ReactNode;
    location?: Location;
    onClickOutside?(event?: React.MouseEvent<HTMLElement, MouseEvent>): void;
    show: boolean;
    offsets?: Offsets;
}
export declare const ModalPopup: (props: ModalPopupProps) => JSX.Element;

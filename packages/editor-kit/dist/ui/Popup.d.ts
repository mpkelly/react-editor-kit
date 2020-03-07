import React from "react";
export interface PopupProps {
    onClose(event: React.MouseEvent<HTMLElement, MouseEvent>): any;
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
    children: JSX.Element;
    attributes?: any;
    className?: string;
}
export declare const Popup: (props: PopupProps) => JSX.Element;
export interface OverlayProps {
    children: JSX.Element;
    onClick?(event: React.MouseEvent<HTMLElement, MouseEvent>): void;
}
export declare const Overlay: import("styled-components").StyledComponent<"div", any, OverlayProps, never>;

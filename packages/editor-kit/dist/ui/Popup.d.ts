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
export declare const Overlay: import("goober").StyledVNode<React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> & {
    children: any;
}>;

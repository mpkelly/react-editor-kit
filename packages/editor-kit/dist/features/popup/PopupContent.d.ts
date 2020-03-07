import React, { CSSProperties } from "react";
export interface PopupContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: JSX.Element | JSX.Element[];
    style?: CSSProperties;
}
export declare const PopupContent: React.MemoExoticComponent<React.ForwardRefExoticComponent<PopupContentProps & React.RefAttributes<unknown>>>;

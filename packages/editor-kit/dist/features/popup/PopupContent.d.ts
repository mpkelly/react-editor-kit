import React, { CSSProperties } from "react";
export interface PopupContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    style?: CSSProperties;
}
export declare const PopupContent: React.MemoExoticComponent<React.ForwardRefExoticComponent<PopupContentProps & React.RefAttributes<unknown>>>;

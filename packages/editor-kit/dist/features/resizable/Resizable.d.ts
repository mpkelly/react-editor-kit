import React, { CSSProperties } from "react";
export interface ResizableProps {
    children: React.ReactNode;
    style?: CSSProperties;
    initialWidth: string | number;
    onChange?(width: number): void;
}
export declare const Resizable: (props: ResizableProps) => JSX.Element;

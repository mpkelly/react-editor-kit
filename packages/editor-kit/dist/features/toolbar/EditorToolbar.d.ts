import React, { CSSProperties } from "react";
export interface EditorToolbarProps {
    children: JSX.Element[];
    className?: string;
    overflowStrategy?: OverflowStrategy;
    style?: CSSProperties;
}
export declare enum OverflowStrategy {
    Wrap = 0,
    Menu = 1
}
export declare const EditorToolbar: React.FC<EditorToolbarProps>;

import React, { CSSProperties } from "react";
import { RenderElementProps } from "slate-react";
export interface ResizableProps extends Partial<RenderElementProps> {
    children: React.ReactNode;
    style?: CSSProperties;
    initialWidth: string | number;
    onChange?(width: number): void;
}
export declare const Resizable: (props: ResizableProps) => JSX.Element;

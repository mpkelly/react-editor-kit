import { CSSProperties } from "react";
export interface ResizableProps {
    children: JSX.Element;
    style?: CSSProperties;
    initialWidth: string | number;
    onChange?(width: number): void;
}
export declare const Resizable: (props: ResizableProps) => JSX.Element;

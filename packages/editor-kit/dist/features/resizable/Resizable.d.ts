/// <reference types="react" />
export interface ResizableProps {
    children: JSX.Element;
    initialWidth: string | number;
    onChange?(width: number): void;
}
export declare const Resizable: (props: ResizableProps) => JSX.Element;

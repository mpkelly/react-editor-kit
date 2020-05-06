/// <reference types="react" />
import { RenderElementProps } from "slate-react";
export interface ResizableElementProps extends RenderElementProps {
    className?: string;
}
export declare const ResizableElement: (props: ResizableElementProps) => JSX.Element;

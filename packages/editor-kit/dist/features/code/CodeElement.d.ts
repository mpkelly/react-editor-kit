/// <reference types="react" />
import { RenderElementProps } from "slate-react";
export declare const CodeElement: (props: RenderElementProps) => JSX.Element;
export interface ToolbarProps extends RenderElementProps {
    onFocus(): void;
    onClose(): void;
}

/// <reference types="react" />
import { RenderElementProps } from "slate-react";
export interface DeletableBlockProps extends RenderElementProps {
    className?: string;
    toolbarContent?: JSX.Element | JSX.Element[];
}
export declare const DeletableBlock: (props: DeletableBlockProps) => JSX.Element;
export interface ToolbarProps {
    onDelete(): void;
}
export declare const Toolbar: (props: ToolbarProps) => JSX.Element;

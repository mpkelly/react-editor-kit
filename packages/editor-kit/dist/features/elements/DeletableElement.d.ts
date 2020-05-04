/// <reference types="react" />
import { RenderElementProps } from "slate-react";
export interface DeletableElementProps extends RenderElementProps {
    className?: string;
    toolbarContent?: JSX.Element | JSX.Element[];
}
export declare const DeletableElement: (props: DeletableElementProps) => JSX.Element;

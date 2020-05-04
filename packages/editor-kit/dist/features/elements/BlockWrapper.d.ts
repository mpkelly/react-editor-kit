/// <reference types="react" />
import { RenderElementProps } from "slate-react";
export interface ElementWrapperProps extends RenderElementProps {
    className?: string;
    focusToolbar?: JSX.Element | JSX.Element[];
    inline?: boolean;
}
export declare const ElementWrapper: (props: ElementWrapperProps) => JSX.Element;

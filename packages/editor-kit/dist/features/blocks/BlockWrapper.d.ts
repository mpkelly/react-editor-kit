/// <reference types="react" />
import { RenderElementProps } from "slate-react";
export interface BlockWrapperProps extends RenderElementProps {
    className?: string;
    focusToolbar?: JSX.Element | JSX.Element[];
    inline?: boolean;
}
export declare const BlockWrapper: (props: BlockWrapperProps) => JSX.Element;

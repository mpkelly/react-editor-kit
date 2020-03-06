/// <reference types="react" />
import { RenderElementProps, ReactEditor } from "slate-react";
export interface LinkProps extends RenderElementProps {
}
export declare const Link: (props: LinkProps) => JSX.Element;
export declare const createLink: (editor: ReactEditor) => void;

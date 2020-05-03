/// <reference types="react" />
import { RenderElementProps } from "slate-react";
import { Icons } from "../icons/Icons";
export interface AlertElementProps extends RenderElementProps {
    icon: keyof Icons;
}
export declare const AlertElement: (props: AlertElementProps) => JSX.Element;

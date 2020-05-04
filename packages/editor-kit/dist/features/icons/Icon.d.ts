import React, { FunctionComponent } from "react";
export declare type EditorIcon = CssIcon | FunctionComponent | JSX.Element;
export interface CssIcon {
    className: string;
    ligature?: string;
}
export interface ReactIconProps {
    icon: EditorIcon;
    className?: string;
    onMouseDown?(event: React.MouseEvent<HTMLElement, MouseEvent>): void;
    onClick?(event: React.MouseEvent<HTMLElement, MouseEvent>): void;
}
export declare const Icon: React.ForwardRefExoticComponent<ReactIconProps & React.RefAttributes<HTMLDivElement>>;

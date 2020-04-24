import React, { ReactNode } from "react";
export declare type EditorIcon = CssIcon | ReactNode;
export interface CssIcon {
    className: string;
    ligature?: string;
}
export interface ReactIconProps {
    icon: EditorIcon;
    className?: string;
    onClick?(event: React.MouseEvent<HTMLElement, MouseEvent>): void;
}
export declare const Icon: (props: ReactIconProps) => JSX.Element;

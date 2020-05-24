import React, { CSSProperties } from "react";
export interface ListProps {
    items: ListItem[];
    activeIndex?: number;
    className?: string;
    style?: CSSProperties;
}
export interface ListItem {
    text?: string;
    onClick?(event?: React.MouseEvent<HTMLElement, MouseEvent>): void;
    style?: CSSProperties;
    disabled?: boolean;
}
export declare const ensureInView: (element: HTMLElement | null) => void;
export declare const List: (props: ListProps) => JSX.Element;

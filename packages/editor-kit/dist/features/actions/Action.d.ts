import React, { MouseEvent as ReactMouseEvent } from "react";
export interface ActionProps {
    children: React.ReactNode;
    onMouseDown(event?: ReactMouseEvent<HTMLElement, MouseEvent>): void;
    isActive(): boolean;
    disabled?: boolean;
}
export interface ActionChildProps {
    active?: boolean;
    onMouseDown?(event: ReactMouseEvent<HTMLElement, MouseEvent>): void;
    disabled?: boolean;
}
export declare const Action: (props: ActionProps) => JSX.Element;

import { MouseEvent as ReactMouseEvent } from "react";
export interface MarkActionProps {
    children: JSX.Element;
    type: string;
    value?: any;
    isActive?(): boolean;
    onMouseDown?(event: ReactMouseEvent<HTMLElement, MouseEvent>): void;
}
export declare const MarkAction: (props: MarkActionProps) => JSX.Element;

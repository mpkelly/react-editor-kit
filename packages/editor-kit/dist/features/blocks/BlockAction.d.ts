import React from "react";
export interface BlockActionProps {
    children: React.ReactNode;
    onMouseDown?(event: React.MouseEvent<HTMLElement, MouseEvent>): void;
    type: string;
}
export declare const BlockAction: (props: BlockActionProps) => JSX.Element;

import React from "react";
export interface ReadOnlyActionProps {
    children: React.ReactNode;
    onMouseDown?(event: React.MouseEvent): void;
}
export declare const ReadOnlyAction: (props: ReadOnlyActionProps) => JSX.Element;

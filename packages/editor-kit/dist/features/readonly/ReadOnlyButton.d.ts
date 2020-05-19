import React from "react";
import { IconButtonProps } from "../buttons/IconButton";
export interface ReadOnlyButtonProps extends IconButtonProps {
    readOnlyClassName: string;
    readOnlyLigature: string;
    onMouseDown?(event: React.MouseEvent): void;
}
export declare const ReadOnlyButton: (props: ReadOnlyButtonProps) => JSX.Element;

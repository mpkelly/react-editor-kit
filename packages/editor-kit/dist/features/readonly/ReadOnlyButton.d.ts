/// <reference types="react" />
import { IconButtonProps } from "../buttons/IconButton";
export interface ReadOnlyButtonProps extends IconButtonProps {
    readOnlyClassName: string;
    readOnlyLigature: string;
}
export declare const ReadOnlyButton: (props: ReadOnlyButtonProps) => JSX.Element;

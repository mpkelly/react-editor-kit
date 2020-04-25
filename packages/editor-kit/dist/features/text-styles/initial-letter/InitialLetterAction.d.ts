/// <reference types="react" />
import { ReactEditor } from "slate-react";
export interface InitialLetterActionProps {
    children: JSX.Element;
}
export declare const InitialLetterAction: (props: InitialLetterActionProps) => JSX.Element;
export declare const isInitialLetterActive: (editor: ReactEditor) => boolean;

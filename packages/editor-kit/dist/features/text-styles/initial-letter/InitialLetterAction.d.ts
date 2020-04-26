import React from "react";
import { ReactEditor } from "slate-react";
export interface InitialLetterActionProps {
    children: React.ReactNode;
}
export declare const InitialLetterAction: (props: InitialLetterActionProps) => JSX.Element;
export declare const isInitialLetterActive: (editor: ReactEditor) => boolean;

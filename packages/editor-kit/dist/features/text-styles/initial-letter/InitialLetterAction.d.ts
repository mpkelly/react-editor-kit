import React from "react";
import { Range } from "slate";
import { ReactEditor } from "slate-react";
export interface InitialLetterActionProps {
    children: React.ReactNode;
}
export declare const InitialLetterAction: (props: InitialLetterActionProps) => JSX.Element;
export declare const isInitialLetterActive: (editor: ReactEditor) => any;
export declare const findInitialLetterRange: (editor: ReactEditor) => Range;

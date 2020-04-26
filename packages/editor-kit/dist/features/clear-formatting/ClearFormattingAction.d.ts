import React from "react";
export interface ClearFormattingActionProps {
    formats?: string[];
    children: React.ReactNode;
}
export declare const ClearFormattingAction: (props: ClearFormattingActionProps) => JSX.Element;
export declare const DefaultEditorFormats: string[];

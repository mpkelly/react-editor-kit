import React from "react";
import { ReactEditor } from "slate-react";
import { Plugin } from "../plugins/Plugin";
export interface EditorKitValue {
    editor: ReactEditor;
    plugins: Plugin[];
    spellCheck: boolean;
    readOnly: boolean;
    disableReadOnly(): void;
    enableReadOnly(): void;
    render(): void;
    disableSpellCheck(): void;
    enableSpellCheck(): void;
    delaySpellCheck(): void;
}
export declare const useEditorKit: () => EditorKitValue;
export interface EditorKitProps {
    children?: JSX.Element | JSX.Element[];
    plugins: Plugin[];
    spellCheck?: boolean;
    readOnly?: boolean;
    onEditor?(editor: ReactEditor): void;
}
export declare const EditorKit: React.MemoExoticComponent<(props: EditorKitProps) => JSX.Element>;

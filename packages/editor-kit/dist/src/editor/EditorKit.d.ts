import React from "react";
import { ReactEditor } from "slate-react";
import { Plugin } from "../plugins/Plugin";
export interface EditorKitValue {
    editor: ReactEditor;
    plugins: Plugin[];
    render(): void;
}
export declare const useEditorKit: () => EditorKitValue;
export interface EditorKitProps {
    children?: JSX.Element | JSX.Element[];
    plugins: Plugin[];
    onEditor?(editor: ReactEditor): void;
}
export declare const EditorKit: React.MemoExoticComponent<(props: EditorKitProps) => JSX.Element>;

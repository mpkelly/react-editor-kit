import React from "react";
import { ReactEditor } from "slate-react";
import { Plugin } from "../plugins/Plugin";
import { PluginActionArgs } from "../plugins/PluginAction";
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
    onClick(): void;
    id: string;
    executeAction(plugin: string, args?: PluginActionArgs, name?: string): void;
    isActionActive(plugin: string, args?: PluginActionArgs, name?: string): boolean;
}
export declare const useEditorKit: () => EditorKitValue;
export interface EditorKitProps {
    children?: JSX.Element | JSX.Element[];
    plugins: Plugin[];
    spellCheck?: boolean;
    readOnly?: boolean;
    onEditor?(editor: ReactEditor): void;
    id?: string;
}
export declare const EditorKit: React.MemoExoticComponent<(props: EditorKitProps) => JSX.Element>;
export declare const UploadId = "uploadMedia";
export declare const FileUpload: () => JSX.Element;

import { ReactEditor } from "slate-react";
import { Plugin } from "../../plugins/Plugin";
export interface BreakoutPluginOptions {
    breakoutBlocks: string[];
    paddedBlocks: string[];
}
export declare const DefaultOptions: BreakoutPluginOptions;
export declare const createBreakoutPlugin: (options?: BreakoutPluginOptions) => Plugin;
export declare const breakoutEditorExtension: (editor: ReactEditor, options: BreakoutPluginOptions) => ReactEditor;

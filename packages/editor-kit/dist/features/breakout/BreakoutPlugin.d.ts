import { ReactEditor } from "slate-react";
import { Plugin } from "../../plugins/Plugin";
export interface BreakoutPluginOptions {
    /**
     * Element that gets padded top and bottom by 1px high paragraphs so
     * users can 'breakout' of these elements
     */
    paddedElements: string[];
}
export declare const DefaultOptions: BreakoutPluginOptions;
export declare const createBreakoutPlugin: (options?: BreakoutPluginOptions) => Plugin;
export declare const breakoutEditorExtension: (editor: ReactEditor, options: BreakoutPluginOptions) => ReactEditor;

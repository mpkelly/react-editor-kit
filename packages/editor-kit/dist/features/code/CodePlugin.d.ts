import { Plugin } from "../../plugins/Plugin";
export declare type Code = Plugin & CodePluginOptions;
export interface CodePluginOptions {
    hideToolbar?: boolean;
}
export declare const createCodePlugin: (options?: CodePluginOptions) => Code;
export declare const CodePlugin: Code;

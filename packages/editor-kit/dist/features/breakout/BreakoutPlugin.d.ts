import { Plugin } from "../../plugins/Plugin";
export interface BreakoutPluginOptions {
    breakoutBlocks: string[];
    paddedBlocks: string[];
}
export declare const DefaultOptions: BreakoutPluginOptions;
export declare const createBreakoutPlugin: (options?: BreakoutPluginOptions) => Plugin;

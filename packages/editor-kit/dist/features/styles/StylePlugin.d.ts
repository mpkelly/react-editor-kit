import { Plugin } from "../../plugins/Plugin";
export interface StylePluginOptions {
    fontSizes: number[];
}
export interface Style extends Plugin {
    data: StylePluginOptions;
}
export declare const createStylePlugin: () => Plugin;
export declare const StylePlugin: Plugin;

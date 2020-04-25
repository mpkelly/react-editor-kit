import { Plugin } from "../../../plugins/Plugin";
import { EditorIcon } from "../../icons/Icon";
export interface InitialLetterPluginOptions {
    style: string;
    onIcon: EditorIcon;
    offIcon: EditorIcon;
}
export declare const InitialLetterDefaultOptions: InitialLetterPluginOptions;
export declare const createInitialLetterPlugin: (options?: InitialLetterPluginOptions) => Plugin;

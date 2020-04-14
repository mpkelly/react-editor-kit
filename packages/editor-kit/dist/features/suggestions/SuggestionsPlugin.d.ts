import { Plugin } from "../../plugins/Plugin";
import { Suggestions } from "./Suggestions";
export interface SuggestionPluginOptions {
    type: string;
    suggestions: Suggestions;
    globalStyle?: string;
    editorStyle?: string;
}
export declare const createSuggestionsPlugin: (options: SuggestionPluginOptions) => Plugin;

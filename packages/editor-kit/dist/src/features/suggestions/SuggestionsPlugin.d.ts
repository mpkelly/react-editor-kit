import { Plugin } from "../../plugins/Plugin";
import { Suggestions } from "./Suggestions";
export interface SuggestionPluginOptions {
    type: string;
    suggestions: Suggestions;
    globalStyle?: string;
    editorStyle?: string;
}
export declare const createSuggestionsPlugin: (options: SuggestionPluginOptions) => Plugin;
export declare const GlobalStyle = "\n  .rek-suggestion-list {\n    margin: 0;\n    padding: 2px;\n    background-color: white;    \n    margin-top:24px;\n    max-height: 250px;\n    overflow:auto;\n  }\n  .rek-suggestion-list li {\n    list-style-type: none;    \n    padding: 8px;\n    font-family:var(--editor-ui-font);    \n  }\n\n  .rek-suggestion-list li.active,\n  .rek-suggestion-list li:hover {\n    background-color: var(--control-hover-color);\n  }\n\n  .rek-suggestion-marker {\n    color:blue;\n  }\n\n  .rek-suggestion-loading {\n    height:50px;\n    width:120px;\n    display:flex;\n    align-items:center;\n    justify-content:center;\n    margin-top:24px;\n  }\n";

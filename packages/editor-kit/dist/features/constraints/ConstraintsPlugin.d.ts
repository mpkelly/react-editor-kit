import { ReactEditor } from "slate-react";
import { Plugin } from "../../plugins/Plugin";
export interface Constraints extends Plugin {
    constraints: EditorConstrains;
}
export declare type EditorConstrains = {
    [blockName: string]: string[];
};
export declare const Marks: string[];
export declare const DefaultConstraints: {
    code: any[];
    "list-item": string[];
    blockquote: string[];
    "table-cell": string[];
    "todo-list": string[];
    "todo-item": string[];
};
export declare const createConstrainsPlugin: (constraints: EditorConstrains) => {
    name: string;
    constraints: EditorConstrains;
    withPlugin: (editor: ReactEditor) => ReactEditor;
};
export declare const ConstraintsPlugin: Constraints;

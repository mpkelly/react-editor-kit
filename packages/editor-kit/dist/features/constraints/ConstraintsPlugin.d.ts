import { Plugin } from "../../plugins/Plugin";
import { ReactEditor } from "slate-react";
export interface Constraints extends Plugin {
    data: {
        constraints: EditorConstrains;
    };
}
export declare type EditorConstrains = {
    [blockName: string]: {
        marks?: string[];
        nodes?: string[];
    };
};
export declare const DefaultConstraints: {
    "code-block": {
        marks: any[];
        nodes: any[];
    };
    "list-item": {
        nodes: string[];
    };
    quote: {
        nodes: string[];
    };
    "table-cell": {
        nodes: string[];
    };
    "todo-list": {
        nodes: string[];
    };
    "todo-item": {
        nodes: string[];
    };
};
export declare const createConstrainsPlugin: (constraints: EditorConstrains) => {
    name: string;
    withPlugin: (editor: ReactEditor) => ReactEditor;
    data: {
        constraints: EditorConstrains;
    };
};
export declare const ConstraintsPlugin: Constraints;

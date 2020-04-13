import { Plugin } from "../../plugins/Plugin";
export interface EditorLabels {
    addColumn: string;
    deleteColumn: string;
    addRow: string;
    deleteRow: string;
    enterUrl: string;
    enterDisplayText: string;
    editLink: string;
    textColor: string;
    backgroundColor: string;
    headerRow: string;
    headerColumn: string;
    numberedColumn: string;
    borderless: string;
}
export declare const EnglishLabels: EditorLabels;
export interface Labels extends Plugin {
    data: EditorLabels;
    name: "labels";
}
export declare const createLabelsPlugin: (labels?: EditorLabels) => Labels;
export declare const LabelsPlugin: Labels;

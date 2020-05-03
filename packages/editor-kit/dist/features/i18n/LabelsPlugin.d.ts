import { Plugin } from "../../plugins/Plugin";
import { EditorLabels } from "./EditorLabels";
export interface LabelsPlugin extends Plugin {
    name: "label-provider";
    labels: EditorLabels;
}
export declare const createLabelsPlugin: (labels?: EditorLabels) => LabelsPlugin;

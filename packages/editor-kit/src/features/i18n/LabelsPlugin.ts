import { Plugin } from "../../plugins/Plugin";
import { EnglishLabels } from "./EnglishLabels";
import { EditorLabels } from "./EditorLabels";

export interface LabelsPlugin extends Plugin {
  name: "label-provider";
  labels: EditorLabels;
}

export const createLabelsPlugin = (labels = EnglishLabels): LabelsPlugin => ({
  name: "label-provider",
  labels,
});

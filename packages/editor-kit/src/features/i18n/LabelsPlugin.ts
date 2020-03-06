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
}

export const EnglishLabels: EditorLabels = {
  addColumn: "Add column",
  deleteColumn: "Delete column",
  addRow: "Add row",
  deleteRow: "Delete row",
  enterUrl: "Enter URL",
  enterDisplayText: "Enter display text",
  editLink: "Edit link",
  textColor: "Text Color",
  backgroundColor: "Background Color"
};

export interface Labels extends Plugin {
  data: EditorLabels;
  name: "labels";
}

export const createLabelsPlugin = (labels = EnglishLabels): Labels => ({
  data: labels,
  name: "labels"
});

export const LabelsPlugin = createLabelsPlugin();

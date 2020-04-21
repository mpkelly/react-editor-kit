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
  save: string;
  validVideoUrl: string;
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
  backgroundColor: "Background Color",
  headerRow: "Header row",
  headerColumn: "Header column",
  numberedColumn: "Numbered column",
  borderless: "Borderless",
  save: "Save",
  validVideoUrl: "A valid video URL",
};

export interface Labels extends Plugin {
  data: EditorLabels;
  name: "labels";
}

export const createLabelsPlugin = (labels = EnglishLabels): Labels => ({
  data: labels,
  name: "labels",
});

export const LabelsPlugin = createLabelsPlugin();

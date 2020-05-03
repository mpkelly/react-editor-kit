import { Plugin } from "../../plugins/Plugin";
import { withHistory } from "slate-history";

export const HistoryPlugin: Plugin = {
  name: "history",
  withPlugin: (editor) => withHistory(editor),
};

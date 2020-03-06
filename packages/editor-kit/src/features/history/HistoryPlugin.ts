import { Plugin } from "../../plugins/Plugin";
import { withHistory } from "slate-history";

export const HistoryPlugin: Plugin = {
  withPlugin: editor => {
    return withHistory(editor);
  }
};

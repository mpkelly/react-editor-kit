import { Plugin } from "../../plugins/Plugin";
import { toggleElement, isElementActive } from "../elements/Elements";
import { PluginAction } from "../../plugins/PluginAction";
import { EditorState } from "../../editor/EditorState";

export const AlertToggleAction: PluginAction = {
  action: (state: EditorState, plugin: Plugin) => {
    toggleElement(state.editor, plugin.name);
  },
  isActionActive: (state: EditorState, plugin: Plugin) =>
    isElementActive(state.editor, plugin.name),
};

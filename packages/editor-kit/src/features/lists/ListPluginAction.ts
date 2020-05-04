import { Element, Transforms } from "slate";
import { PluginAction } from "../../plugins/PluginAction";
import { getAncestor } from "../../editor/Editor";
import { ReactEditor } from "slate-react";
import { toggleList } from "./ListPlugin";

export const ListPluginAction: PluginAction = {
  action: ({ editor, element, elementType }, plugin) => {
    if (elementType === "list-item") {
      element = getAncestor(editor, element as Element, 1) as Element;
    }
    const other =
      plugin.name === "ordered-list" ? "unordered-list" : "ordered-list";
    if (element && element.type == other) {
      Transforms.setNodes(
        editor,
        { type: plugin.name, children: [] },
        { at: ReactEditor.findPath(editor, element) }
      );
    } else {
      return toggleList(editor, plugin.name);
    }
  },
  isActionActive: ({ editor, element }, plugin) => {
    if (!element || element.type !== "list-item") {
      return false;
    }
    const parent = getAncestor(editor, element as Element, 1);
    return parent?.type == plugin.name;
  },
};

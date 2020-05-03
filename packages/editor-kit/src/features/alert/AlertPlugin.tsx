import React from "react";
import { RenderElementProps } from "slate-react";
import { Plugin } from "../../plugins/Plugin";
import { PluginAction } from "../../plugins/PluginAction";
import { AlertElement } from "./AlertElement";
import { alertEditorStyle } from "./AlertEditorStyle";
import { AlertToggleAction } from "./AlertToggleAction";
import { Icons } from "../icons/Icons";

export const AlertActions: PluginAction[] = [AlertToggleAction];

export const createAlertPlugin = (
  icon: keyof Icons,
  name: string,
  iconColor: string,
  backgroundColor: string,
  trigger: string
): Plugin => {
  return {
    name: name,
    triggers: [{ pattern: `:${trigger}` }],
    actions: AlertActions,
    renderElement: (props: RenderElementProps) => {
      if (props.element.type === name) {
        return <AlertElement {...props} icon={icon} />;
      }
    },
    editorStyle: alertEditorStyle(name, backgroundColor, iconColor),
  };
};

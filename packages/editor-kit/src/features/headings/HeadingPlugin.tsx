import { RenderElementProps } from "slate-react";
import { Plugin } from "../../plugins/Plugin";
import { Trigger } from "../../plugins/Trigger";
import { renderElement } from "../elements/ElementRenderer";
import { EditorRange } from "../../editor/Ranges";
import { HeadingPluginAction } from "./HeadingPluginAction";

export const createHeadingPlugin = (
  type: string,
  triggers: Trigger[] = []
): Plugin => {
  return {
    name: type,
    triggers: triggers,
    actions: [HeadingPluginAction],
    renderElement: (props: RenderElementProps) => {
      return renderElement(props, type, type);
    },
  };
};

export const createDefaultHeadingPlugin = (
  type: string,
  patterns: string[]
) => {
  const triggers: Trigger[] = [
    { pattern: new RegExp(`^:${type}`), range: "line-before" as EditorRange },
  ].concat(
    patterns.map((pattern) => ({
      pattern: new RegExp(`^${pattern}`),
      range: "line-before",
    }))
  );

  return createHeadingPlugin(type, triggers);
};

import { Plugin } from "../../plugins/Plugin";
import { HeadingTogglePluginAction } from "./HeadingTogglePluginAction";

export const HeadingTogglePlugin: Plugin = {
  name: "heading-toggle",
  actions: [HeadingTogglePluginAction],
};

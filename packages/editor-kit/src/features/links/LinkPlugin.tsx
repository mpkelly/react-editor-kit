import React from "react";
import { Plugin } from "../../plugins/Plugin";
import { RenderElementProps } from "slate-react";
import { Link } from "./LinkElement";
import { LinkGlobalStyle } from "./LinkGlobalStyle";
import { registerInline } from "../inlines/Inlines";
import { LinkPluginAction } from "./LinkPluginAction";

export const LinkPlugin: Plugin = {
  name: "link",
  withPlugin: (editor) => registerInline(editor, "link"),
  actions: [LinkPluginAction],
  renderElement: (props: RenderElementProps) => {
    const { element } = props;
    if (element.type === "link") {
      return <Link {...props} />;
    }
    return undefined;
  },
  globalStyle: LinkGlobalStyle,
};

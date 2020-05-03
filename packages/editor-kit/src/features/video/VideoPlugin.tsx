import React from "react";
import { RenderElementProps } from "slate-react";
import { Plugin } from "../../plugins/Plugin";
import { VideoElement } from "./VideoElement";
import { VideoGlobalStyle } from "./VideoGlobalStyle";
import { VideoEditorStyle } from "./VideoEditorStyle";
import { registerVoid } from "../void/VoidElement";
import { VideoPluginAction } from "./VideoPluginAction";
import { VideoNamedTrigger } from "./VideoNamedTrigger";

export const VideoPlugin: Plugin = {
  name: "video",
  withPlugin: (editor) => registerVoid(editor, "video"),
  triggers: [VideoNamedTrigger],
  actions: [VideoPluginAction],
  renderElement: (props: RenderElementProps) => {
    if (props.element.type === "video") {
      return <VideoElement {...props} />;
    }
    return undefined;
  },
  globalStyle: VideoGlobalStyle,
  editorStyle: VideoEditorStyle,
};

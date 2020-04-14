import React from "react";
import { Action } from "../actions/Action";
import { Plugin } from "../../plugins/Plugin";
import { isNodeActive } from "../blocks/Blocks";
import { useEditorKit } from "../../editor/EditorKit";
import { usePlugin } from "../../plugins/usePlugin";
import { useLastFocused } from "../../editor/LastFocusedNode";

export interface VideoActionProps {
  children: JSX.Element;
}

export const VideoAction = (props: VideoActionProps) => {
  const { children } = props;
  const { editor } = useEditorKit();
  const video = usePlugin("video") as Plugin;
  const { node } = useLastFocused(editor);
  const onMouseDown = () => {
    video.onTrigger && video.onTrigger(editor);
  };
  const isActive = () => isNodeActive(editor, "video");
  const enabled = editor.isNodeSupported("video", node);
  return (
    <Action onMouseDown={onMouseDown} isActive={isActive} disabled={!enabled}>
      {children}
    </Action>
  );
};

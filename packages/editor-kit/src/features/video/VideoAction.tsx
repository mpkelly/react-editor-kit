import React from "react";
import { Action } from "../actions/Action";
import { Plugin } from "../../plugins/Plugin";
import { isNodeActive } from "../blocks/Blocks";
import { useEditorKit } from "../../editor/EditorKit";
import { usePlugin } from "../../plugins/usePlugin";

export interface VideoActionProps {
  children: JSX.Element;
}

export const VideoAction = (props: VideoActionProps) => {
  const { children } = props;
  const { editor } = useEditorKit();
  const video = usePlugin("video") as Plugin;
  const onMouseDown = () => {
    video.onTrigger && video.onTrigger(editor);
  };
  const isActive = () => isNodeActive(editor, "video");
  const enabled = editor.isNodeSupported("video");
  return (
    <Action onMouseDown={onMouseDown} isActive={isActive} disabled={!enabled}>
      {children}
    </Action>
  );
};

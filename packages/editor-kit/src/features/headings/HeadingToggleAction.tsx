import React from "react";
import { ReactEditor } from "slate-react";
import { useEditorKit } from "../../editor/EditorKit";
import { isNodeActive, toggleBlock } from "../blocks/Blocks";
import { Action } from "../actions/Action";
import { useLastFocused } from "../../editor/LastFocusedNode";

export interface HeadingToggleActionProps {
  children: JSX.Element;
  heading?: string;
}

export const HeadingToggleAction = (props: HeadingToggleActionProps) => {
  let { children, heading } = props;
  const { editor } = useEditorKit();
  heading = heading || "h1";

  const onMouseDown = () => {
    if (!ReactEditor.isFocused(editor)) {
      ReactEditor.focus(editor);
    }
    toggleBlock(editor, heading as string);
  };
  const isActive = () => isNodeActive(editor, heading as string);
  const { node } = useLastFocused(editor);
  const enabled = editor.isNodeSupported(heading, node);

  return (
    <Action onMouseDown={onMouseDown} isActive={isActive} disabled={!enabled}>
      {children}
    </Action>
  );
};

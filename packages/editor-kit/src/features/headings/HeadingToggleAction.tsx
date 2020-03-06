import React from "react";
import { ReactEditor } from "slate-react";
import { useEditorKit } from "../../editor/EditorKit";
import { isNodeActive, toggleBlock } from "../blocks/Blocks";
import { Action } from "../actions/Action";

export interface HeadingToggleActionProps {
  children: JSX.Element;
  heading?: string;
}

export const HeadingToggleAction = (props: HeadingToggleActionProps) => {
  const { children, heading } = props;
  const { editor } = useEditorKit();
  const _heading = heading || "h1";

  const onMouseDown = () => {
    if (!ReactEditor.isFocused(editor)) {
      ReactEditor.focus(editor);
    }
    toggleBlock(editor, _heading);
  };
  const isActive = () => isNodeActive(editor, _heading);
  const enabled = editor.isNodeSupported(_heading);

  return (
    <Action onMouseDown={onMouseDown} isActive={isActive} disabled={!enabled}>
      {children}
    </Action>
  );
};

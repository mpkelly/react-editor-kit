import React from "react";
import { ReactEditor } from "slate-react";
import { useEditorKit } from "../../editor/EditorKit";
import { createLink } from "./Link";

import { isNodeActive } from "../blocks/Blocks";
import { Action } from "../actions/Action";

export interface LinkActionProps {
  children: JSX.Element;
}

export const LinkAction = (props: LinkActionProps) => {
  const { children } = props;
  const { editor } = useEditorKit();

  const onMouseDown = () => {
    if (!ReactEditor.isFocused(editor)) {
      ReactEditor.focus(editor);
    }
    editor.markSelection();
    createLink(editor);
  };
  const isActive = () => isNodeActive(editor, "link");
  const enabled = editor.isNodeSupported("link");

  return (
    <Action onMouseDown={onMouseDown} isActive={isActive} disabled={!enabled}>
      {children}
    </Action>
  );
};

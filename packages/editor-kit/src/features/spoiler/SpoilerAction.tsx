import React, { memo, useCallback } from "react";
import { useEditorKit } from "../../editor/EditorKit";
import { isNodeActive } from "../blocks/Blocks";
import { Action } from "../actions/Action";
import { toggleInline } from "../inlines/Inlines";

export interface SpoilerActionProps {
  children: React.ReactNode;
}

export const SpoilerAction = memo((props: SpoilerActionProps) => {
  const { children } = props;
  const { editor } = useEditorKit();
  const toggleLink = useCallback(() => {
    toggleInline(editor, "spoiler");
  }, []);
  const isActive = useCallback(() => {
    return isNodeActive(editor, "spoiler");
  }, []);
  return (
    <Action onMouseDown={toggleLink} isActive={isActive}>
      {children}
    </Action>
  );
});

import React, { MouseEvent as ReactMouseEvent } from "react";
import { toggleMark, isMarkActive } from "./Marks";
import { useEditorKit } from "../../editor/EditorKit";
import { Action } from "../actions/Action";

export interface MarkActionProps {
  children: JSX.Element;
  type: string;
  value?: any;
}

export const MarkAction = (props: MarkActionProps) => {
  const { type, children, value } = props;
  const { editor } = useEditorKit();
  const enabled = editor.isNodeSupported(type);
  const onMouseDown = (event: ReactMouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    toggleMark(editor, type, value);
  };

  const isActive = () => isMarkActive(editor, type);
  return (
    <Action isActive={isActive} onMouseDown={onMouseDown} disabled={!enabled}>
      {children}
    </Action>
  );
};

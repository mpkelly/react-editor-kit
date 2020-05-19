import React from "react";
import { blockEvent } from "../../ui/Utils";
import { useEditorKit } from "../../editor/EditorKit";
import { Action } from "../actions/Action";

export interface ReadOnlyActionProps {
  children: React.ReactNode;
  onMouseDown?(event: React.MouseEvent): void;
}

export const ReadOnlyAction = (props: ReadOnlyActionProps) => {
  const { children } = props;
  const { readOnly, enableReadOnly, disableReadOnly } = useEditorKit();

  const isActive = () => readOnly;
  let onMouseDown = props.onMouseDown;
  if (!onMouseDown) {
    onMouseDown = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      blockEvent(event);
      if (isActive()) {
        disableReadOnly();
      } else {
        enableReadOnly();
      }
    };
  }
  return (
    <Action onMouseDown={onMouseDown} active={isActive()}>
      {children}
    </Action>
  );
};

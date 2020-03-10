import React from "react";
import { Action } from "../actions/Action";
import { block } from "../../ui/Utils";
import { useEditorKit } from "../../editor/EditorKit";

export interface ReadOnlyActionProps {
  children: JSX.Element;
}

export const ReadOnlyAction = (props: ReadOnlyActionProps) => {
  const { children } = props;
  const { readOnly, enableReadOnly, disableReadOnly } = useEditorKit();

  const isActive = () => readOnly;
  const onMouseDown = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    block(event);
    if (isActive()) {
      disableReadOnly();
    } else {
      enableReadOnly();
    }
  };
  return (
    <Action onMouseDown={onMouseDown} isActive={isActive}>
      {children}
    </Action>
  );
};

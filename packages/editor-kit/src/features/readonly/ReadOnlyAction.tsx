import React from "react";
import { blockEvent } from "../../ui/Utils";
import { useEditorKit } from "../../editor/EditorKit";

export interface ReadOnlyActionProps {
  children: React.ReactNode;
}

export const ReadOnlyAction = (props: ReadOnlyActionProps) => {
  const { children } = props;
  const { readOnly, enableReadOnly, disableReadOnly } = useEditorKit();

  const isActive = () => readOnly;
  const onMouseDown = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    blockEvent(event);
    if (isActive()) {
      disableReadOnly();
    } else {
      enableReadOnly();
    }
  };
  return (
    <div onMouseDown={onMouseDown} className={isActive() ? "rek-active" : ""}>
      {children}
    </div>
  );
};

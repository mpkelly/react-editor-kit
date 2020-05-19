import React from "react";
import { IconButtonProps, IconButton } from "../buttons/IconButton";
import { ReadOnlyAction } from "./ReadOnlyAction";
import { useEditorKit } from "../../editor/EditorKit";

export interface ReadOnlyButtonProps extends IconButtonProps {
  readOnlyClassName: string;
  readOnlyLigature: string;
  onMouseDown?(event: React.MouseEvent): void;
}

export const ReadOnlyButton = (props: ReadOnlyButtonProps) => {
  const { onMouseDown } = props;
  const { readOnly } = useEditorKit();
  let className = props.className;
  let ligature = props.ligature;
  if (readOnly) {
    className = props.readOnlyClassName || className;
    ligature = props.readOnlyLigature || ligature;
  }
  return (
    <ReadOnlyAction onMouseDown={onMouseDown}>
      <IconButton
        className={className}
        ligature={ligature}
        data-button={"read-only"}
      />
    </ReadOnlyAction>
  );
};

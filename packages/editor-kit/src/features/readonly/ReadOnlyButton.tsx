import React from "react";
import { IconButtonProps, IconButton } from "../buttons/IconButton";
import { ReadOnlyAction } from "./ReadOnlyAction";
import { useEditorKit } from "../../editor/EditorKit";

export interface ReadOnlyButtonProps extends IconButtonProps {
  readOnlyClassName: string;
  readOnlyLigature: string;
}

export const ReadOnlyButton = (props: ReadOnlyButtonProps) => {
  const { readOnly } = useEditorKit();
  let className = props.className;
  let ligature = props.ligature;
  if (readOnly) {
    className = props.readOnlyClassName || className;
    ligature = props.readOnlyLigature || ligature;
  }
  return (
    <ReadOnlyAction>
      <IconButton
        className={className}
        ligature={ligature}
        data-block-button={"read-only"}
      />
    </ReadOnlyAction>
  );
};

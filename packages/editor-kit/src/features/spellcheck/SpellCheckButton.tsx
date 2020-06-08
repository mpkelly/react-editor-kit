import React from "react";
import { IconButtonProps, IconButton } from "../buttons/IconButton";
import { useEditorKit } from "../../editor/EditorKit";
import { blockEvent } from "../../ui/Utils";

export const SpellCheckButton = (props: IconButtonProps) => {
  const { spellCheck, disableSpellCheck, enableSpellCheck } = useEditorKit();

  const onMouseDown = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    blockEvent(event);
    if (spellCheck) {
      disableSpellCheck();
    } else {
      enableSpellCheck();
    }
  };
  return (
    <IconButton {...props} onMouseDown={onMouseDown} active={spellCheck} />
  );
};

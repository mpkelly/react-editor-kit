import React from "react";
import { IconButtonProps, IconButton } from "../buttons/IconButton";
import { SpellCheckAction } from "./SpellCheckAction";

export const SpellCheckButton = (props: IconButtonProps) => {
  return (
    <SpellCheckAction>
      <IconButton {...props} data-block-button={"spell-check"} />
    </SpellCheckAction>
  );
};

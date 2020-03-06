import React from "react";
import { IconProps, IconButton } from "../../buttons/IconButton";
import { TextAlignAction } from "./TextAlignAction";

export const TextAlignRightButton = (props: IconProps) => {
  return (
    <TextAlignAction textAlign="right">
      <IconButton {...props} data-text-align-button="right" />
    </TextAlignAction>
  );
};

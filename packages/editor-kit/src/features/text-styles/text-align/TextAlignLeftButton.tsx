import React from "react";
import { IconProps, IconButton } from "../../buttons/IconButton";
import { TextAlignAction } from "./TextAlignAction";

export const TextAlignLeftButton = (props: IconProps) => {
  return (
    <TextAlignAction textAlign="left">
      <IconButton {...props} data-text-align-button="left" />
    </TextAlignAction>
  );
};

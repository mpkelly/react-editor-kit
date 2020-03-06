import React from "react";
import { IconProps, IconButton } from "../../buttons/IconButton";
import { TextAlignAction } from "./TextAlignAction";

export const TextAlignJustifiedButton = (props: IconProps) => {
  return (
    <TextAlignAction textAlign="justify">
      <IconButton {...props} data-text-align-button="justify" />
    </TextAlignAction>
  );
};

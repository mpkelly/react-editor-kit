import React from "react";
import { IconProps, IconButton } from "../../buttons/IconButton";
import { TextAlignAction } from "./TextAlignAction";

export const TextAlignCenterButton = (props: IconProps) => {
  return (
    <TextAlignAction textAlign="center">
      <IconButton {...props} data-text-align-button="center" />
    </TextAlignAction>
  );
};

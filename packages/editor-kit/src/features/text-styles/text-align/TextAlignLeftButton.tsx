import React from "react";
import { IconProps, IconButton } from "../../buttons/IconButton";
import { TextAlignAction } from "./TextAlignAction";
import { TooltipContentProps } from "../../popup/Tooltip";

export const TextAlignLeftButton = (props: IconProps & TooltipContentProps) => {
  return (
    <TextAlignAction textAlign="left">
      <IconButton {...props} data-text-align-button="left" />
    </TextAlignAction>
  );
};

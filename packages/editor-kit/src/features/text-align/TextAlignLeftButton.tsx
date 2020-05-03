import React from "react";
import { IconProps } from "../buttons/IconButton";
import { TooltipContentProps } from "../popup/Tooltip";
import { ActionButton } from "../actions/ActionButton";

export const TextAlignLeftButton = (props: IconProps & TooltipContentProps) => {
  return (
    <ActionButton plugin="text-align" args={{ textAlign: "left" }} {...props} />
  );
};

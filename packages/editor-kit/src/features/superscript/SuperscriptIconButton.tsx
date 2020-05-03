import React from "react";
import { IconProps } from "../buttons/IconButton";
import { TooltipContentProps } from "../popup/Tooltip";
import { ActionButton } from "../actions/ActionButton";

export const SuperscriptButton = (props: IconProps & TooltipContentProps) => {
  return <ActionButton {...props} plugin="super" />;
};

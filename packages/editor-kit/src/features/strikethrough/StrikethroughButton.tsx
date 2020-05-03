import React from "react";
import { TooltipContentProps } from "../popup/Tooltip";
import { IconProps } from "../buttons/IconButton";
import { ActionButton } from "../actions/ActionButton";

export const StrikethroughButton = (props: IconProps & TooltipContentProps) => {
  return <ActionButton {...props} plugin="strikethrough" />;
};

import React from "react";
import { ActionButton } from "../actions/ActionButton";
import { IconProps } from "../buttons/IconButton";
import { TooltipContentProps } from "../popup/Tooltip";

export const ClearFormattingButton = (
  props: IconProps & TooltipContentProps
) => {
  return <ActionButton {...props} plugin="clear-formatting" />;
};

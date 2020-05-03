import React from "react";
import { IconProps } from "../buttons/IconButton";
import { ActionButton } from "../actions/ActionButton";
import { TooltipContentProps } from "../popup/Tooltip";

export const TableButton = (props: IconProps & TooltipContentProps) => {
  return <ActionButton plugin="table" {...props} />;
};

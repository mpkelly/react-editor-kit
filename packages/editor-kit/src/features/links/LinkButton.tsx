import React from "react";
import { IconProps } from "../buttons/IconButton";
import { ActionButton } from "../actions/ActionButton";
import { TooltipContentProps } from "../popup/Tooltip";

export const LinkButton = (props: IconProps & TooltipContentProps) => {
  return <ActionButton plugin="link" {...props} />;
};

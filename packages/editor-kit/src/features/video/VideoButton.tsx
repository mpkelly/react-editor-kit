import React from "react";
import { IconProps } from "../buttons/IconButton";
import { TooltipContentProps } from "../popup/Tooltip";
import { ActionButton } from "../actions/ActionButton";

export const VideoButton = (props: IconProps & TooltipContentProps) => {
  return <ActionButton plugin="video" {...props} />;
};

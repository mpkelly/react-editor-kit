import React from "react";
import { IconProps } from "../buttons/IconButton";
import { TooltipContentProps } from "../popup/Tooltip";
import { ActionButton } from "../actions/ActionButton";

export interface UnorderedListButtonProps
  extends IconProps,
    TooltipContentProps {}

export const UnorderedListButton = (props: UnorderedListButtonProps) => {
  return <ActionButton plugin="unordered-list" {...props} />;
};

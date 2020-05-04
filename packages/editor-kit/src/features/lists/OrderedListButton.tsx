import React from "react";
import { IconProps } from "../buttons/IconButton";
import { TooltipContentProps } from "../popup/Tooltip";
import { ActionButton } from "../actions/ActionButton";

export interface OrderedListButtonProps
  extends IconProps,
    TooltipContentProps {}

export const OrderedListButton = (props: OrderedListButtonProps) => {
  return <ActionButton plugin="ordered-list" {...props} />;
};

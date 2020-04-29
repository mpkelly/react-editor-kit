import React from "react";
import { OrderedListAction } from "./OrderedListAction";
import { IconProps, IconButton } from "../buttons/IconButton";
import { TooltipContentProps } from "../popup/Tooltip";

export interface OrderedListButtonProps
  extends IconProps,
    TooltipContentProps {}

export const OrderedListButton = (props: OrderedListButtonProps) => {
  return (
    <OrderedListAction>
      <IconButton {...props} data-id-button-ordered-list />
    </OrderedListAction>
  );
};

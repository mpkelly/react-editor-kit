import React from "react";
import { OrderedListAction } from "./OrderedListAction";
import { IconProps, IconButton } from "../buttons/IconButton";

export interface OrderedListButtonProps extends IconProps {}

export const OrderedListButton = (props: OrderedListButtonProps) => {
  return (
    <OrderedListAction>
      <IconButton {...props} data-id-button-ordered-list />
    </OrderedListAction>
  );
};

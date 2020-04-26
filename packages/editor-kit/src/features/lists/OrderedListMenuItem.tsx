import React from "react";
import { MenuItemProps, MenuItem } from "../menu/MenuItem";
import { OrderedListAction } from "./OrderedListAction";

export interface OrderedListMenuItemProps extends Partial<MenuItemProps> {}

export const OrderedListMenuItem = (props: OrderedListMenuItemProps) => {
  return (
    <OrderedListAction>
      <MenuItem {...props} />
    </OrderedListAction>
  );
};

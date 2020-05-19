import React from "react";
import { MenuItemProps } from "../menu/MenuItem";
import { MarkMenuItem } from "../marks/MarkMenuItem";

export interface SubscriptMenuItemProps extends Partial<MenuItemProps> {}

export const SubscriptMenuItem = (props: SubscriptMenuItemProps) => {
  return <MarkMenuItem type="subscript" {...props} />;
};

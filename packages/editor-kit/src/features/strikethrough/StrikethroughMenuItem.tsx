import React from "react";
import { MenuItemProps } from "../menu/MenuItem";
import { MarkMenuItem } from "../marks/MarkMenuItem";

export interface StrikethroughMenuItemProps extends Partial<MenuItemProps> {}

export const StrikethroughMenuItem = (props: StrikethroughMenuItemProps) => {
  return <MarkMenuItem type="strikethrough" {...props} />;
};

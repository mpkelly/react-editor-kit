import React from "react";
import { MenuItemProps } from "../menu/MenuItem";
import { MarkMenuItem } from "../marks/MarkMenuItem";

export interface BoldMenuItemProps extends Partial<MenuItemProps> {}

export const BoldMenuItem = (props: BoldMenuItemProps) => {
  return <MarkMenuItem type="bold" {...props} />;
};

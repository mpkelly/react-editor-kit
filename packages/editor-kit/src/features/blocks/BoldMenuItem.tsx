import React from "react";
import { MenuItemProps, MenuItem } from "../menu/MenuItem";
import { BoldAction } from "../bold/BoldAction";

export interface BoldMenuItemProps extends Partial<MenuItemProps> {}

export const BoldMenuItem = (props: BoldMenuItemProps) => {
  return (
    <BoldAction>
      <MenuItem {...props} />
    </BoldAction>
  );
};

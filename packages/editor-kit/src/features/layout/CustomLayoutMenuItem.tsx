import React from "react";
import { MenuItemProps, MenuItem } from "../menu/MenuItem";
import { CustomLayoutAction } from "./CustomLayoutAction";

export interface CustomLayoutMenuItemProps extends Partial<MenuItemProps> {}

export const CustomLayoutMenuItem = (props: CustomLayoutMenuItemProps) => {
  return (
    <CustomLayoutAction>
      <MenuItem {...props} />
    </CustomLayoutAction>
  );
};

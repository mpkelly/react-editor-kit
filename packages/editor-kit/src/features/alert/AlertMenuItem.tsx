import React from "react";
import { MenuItemProps, MenuItem } from "../menu/MenuItem";
import { AlertAction } from "./AlertAction";

export interface AlertMenuItemProps extends Partial<MenuItemProps> {
  type: string;
}

export const AlertMenuItem = (props: AlertMenuItemProps) => {
  const { type, ...rest } = props;
  return (
    <AlertAction type={type}>
      <MenuItem {...rest} />
    </AlertAction>
  );
};

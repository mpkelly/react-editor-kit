import React from "react";
import { MenuItemProps, MenuItem } from "../menu/MenuItem";
import { HeadingAction } from "./HeadingAction";

export interface HeadingMenuItemProps extends Partial<MenuItemProps> {
  type: string;
}

export const HeadingMenuItem = (props: HeadingMenuItemProps) => {
  const { type, ...rest } = props;
  return (
    <HeadingAction heading={type}>
      <MenuItem {...rest} />
    </HeadingAction>
  );
};

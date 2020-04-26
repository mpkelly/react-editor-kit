import React from "react";
import { MenuItemProps, MenuItem } from "../menu/MenuItem";
import { LinkAction } from "./LinkAction";

export interface LinkMenuItemProps extends Partial<MenuItemProps> {}

export const LinkMenuItem = (props: LinkMenuItemProps) => {
  return (
    <LinkAction>
      <MenuItem {...props} />
    </LinkAction>
  );
};

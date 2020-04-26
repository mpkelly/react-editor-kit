import React from "react";
import { MenuItemProps, MenuItem } from "../menu/MenuItem";
import { UnorderedListAction } from "./UnorderedListAction";

export interface UnorderedListMenuItemProps extends Partial<MenuItemProps> {}

export const UnorderedListMenuItem = (props: UnorderedListMenuItemProps) => {
  return (
    <UnorderedListAction>
      <MenuItem {...props} />
    </UnorderedListAction>
  );
};

import React from "react";
import { MenuItemProps, MenuItem } from "../menu/MenuItem";
import { BlockquoteAction } from "./BlockquoteAction";

export interface BlockquoteMenuItemProps extends Partial<MenuItemProps> {}

export const BlockquoteMenuItem = (props: BlockquoteMenuItemProps) => {
  return (
    <BlockquoteAction>
      <MenuItem {...props} />
    </BlockquoteAction>
  );
};

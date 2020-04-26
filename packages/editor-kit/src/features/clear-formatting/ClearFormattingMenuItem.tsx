import React from "react";
import { MenuItemProps, MenuItem } from "../menu/MenuItem";
import { ClearFormattingAction } from "./ClearFormattingAction";

export interface ClearFormattingMenuItemProps extends Partial<MenuItemProps> {}

export const ClearFormattingMenuItem = (
  props: ClearFormattingMenuItemProps
) => {
  return (
    <ClearFormattingAction>
      <MenuItem {...props} />
    </ClearFormattingAction>
  );
};

import React from "react";
import { MenuItemProps, MenuItem } from "../menu/MenuItem";
import { InitialLetterAction } from "./InitialLetterAction";

export interface InitialLetterMenuItemProps extends Partial<MenuItemProps> {}

export const InitialLetterMenuItem = (props: InitialLetterMenuItemProps) => {
  return (
    <InitialLetterAction>
      <MenuItem {...props} />
    </InitialLetterAction>
  );
};

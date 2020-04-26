import React from "react";
import { MenuItemProps } from "../menu/MenuItem";
import { MarkMenuItem } from "../marks/MarkMenuItem";

export interface SuperscriptMenuItemProps extends Partial<MenuItemProps> {}

export const SuperscriptMenuItem = (props: SuperscriptMenuItemProps) => {
  return <MarkMenuItem type="super" {...props} />;
};

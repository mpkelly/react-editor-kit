import React from "react";
import { MenuItemProps } from "../menu/MenuItem";
import { MarkMenuItem } from "../marks/MarkMenuItem";

export interface ItalicMenuItemProps extends Partial<MenuItemProps> {}

export const ItalicMenuItem = (props: ItalicMenuItemProps) => {
  return <MarkMenuItem type="italic" {...props} />;
};

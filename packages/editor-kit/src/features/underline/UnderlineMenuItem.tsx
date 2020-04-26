import React from "react";
import { MenuItemProps } from "../menu/MenuItem";
import { MarkMenuItem } from "../marks/MarkMenuItem";

export interface UnderlineMenuItemProps extends Partial<MenuItemProps> {}

export const UnderlineMenuItem = (props: UnderlineMenuItemProps) => {
  return <MarkMenuItem type="underline" {...props} />;
};

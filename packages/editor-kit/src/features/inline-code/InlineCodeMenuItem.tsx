import React from "react";
import { MenuItemProps } from "../menu/MenuItem";
import { MarkMenuItem } from "../marks/MarkMenuItem";

export interface InlineCodeMenuItemProps extends Partial<MenuItemProps> {}

export const InlineCodeMenuItem = (props: InlineCodeMenuItemProps) => {
  return <MarkMenuItem type="inline-code" {...props} />;
};

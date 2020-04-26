import React from "react";
import { MenuItemProps, MenuItem } from "../menu/MenuItem";
import { QuoteAction } from "./QuoteAction";

export interface QuoteMenuItemProps extends Partial<MenuItemProps> {}

export const QuoteMenuItem = (props: QuoteMenuItemProps) => {
  return (
    <QuoteAction>
      <MenuItem {...props} />
    </QuoteAction>
  );
};

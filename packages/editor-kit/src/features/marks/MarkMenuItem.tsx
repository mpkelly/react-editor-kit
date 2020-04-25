import React from "react";
import { MarkAction } from "./MarkAction";
import { MenuItemProps, MenuItem } from "../menu/MenuItem";

export interface MarkMenuItemProps extends MenuItemProps {
  type: string;
  value?: any;
}

export const MarkMenuItem = (props: MarkMenuItemProps) => {
  const { type, value, ...rest } = props;
  return (
    <MarkAction type={type} value={value}>
      <MenuItem {...rest} data-mark-menu-item={type} />
    </MarkAction>
  );
};

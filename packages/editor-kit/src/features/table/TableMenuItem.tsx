import React from "react";
import { MenuItemProps, MenuItem } from "../menu/MenuItem";
import { TableAction } from "./TableAction";

export interface TableMenuItemProps extends Partial<MenuItemProps> {}

export const TableMenuItem = (props: TableMenuItemProps) => {
  return (
    <TableAction>
      <MenuItem {...props} />
    </TableAction>
  );
};

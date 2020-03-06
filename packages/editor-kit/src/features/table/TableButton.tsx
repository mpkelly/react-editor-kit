import React from "react";
import { IconProps, IconButton } from "../buttons/IconButton";
import { TableAction } from "./TableAction";

export const TableButton = (props: IconProps) => {
  return (
    <TableAction>
      <IconButton {...props} data-block-button="table" />
    </TableAction>
  );
};

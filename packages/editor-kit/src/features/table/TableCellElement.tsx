import React from "react";
import { RenderElementProps } from "slate-react";
import { TableCellControls } from "./TableCellControls";

export const TableCellElement = (props: RenderElementProps) => {
  const { attributes, children, element, ...rest } = props;
  return (
    <td {...attributes} {...rest} className="rek-td">
      <TableCellControls {...props} />
      {children}
    </td>
  );
};

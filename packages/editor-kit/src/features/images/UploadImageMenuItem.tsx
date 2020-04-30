import React from "react";
import { MenuItemProps, MenuItem } from "../menu/MenuItem";
import { UploadImageActionProps, UploadImageAction } from "./UploadImageAction";

export interface UploadImageMenuItemProps
  extends Omit<UploadImageActionProps, "children">,
    Omit<MenuItemProps, "children"> {}

export const UploadImageMenuItem = (props: UploadImageMenuItemProps) => {
  const { extensions, ...rest } = props;
  return (
    <UploadImageAction extensions={extensions}>
      <MenuItem {...rest} />
    </UploadImageAction>
  );
};

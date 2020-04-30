import React from "react";
import { MenuItemProps, MenuItem } from "../menu/MenuItem";
import { UploadImageActionProps } from "./UploadImageAction";
import { InsertImageByUrlAction } from "./InsertImageByUrlAction";

export interface InsertImageByUrlMenuItemProps
  extends Omit<UploadImageActionProps, "children">,
    Omit<MenuItemProps, "children"> {}

export const InsertImageByUrlMenuItem = (
  props: InsertImageByUrlMenuItemProps
) => {
  const { extensions, ...rest } = props;
  return (
    <InsertImageByUrlAction extensions={extensions}>
      <MenuItem {...rest} />
    </InsertImageByUrlAction>
  );
};

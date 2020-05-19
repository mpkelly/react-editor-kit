import React from "react";
import { MenuItemProps, MenuItem } from "../menu/MenuItem";
import { LayoutAction, LayoutActionProps } from "./LayoutAction";

export interface LayoutMenuItemProps
  extends Omit<MenuItemProps, "children">,
    Omit<LayoutActionProps, "children"> {}

export const LayoutMenuItem = (props: LayoutMenuItemProps) => {
  const { layout, ...rest } = props;

  return (
    <LayoutAction layout={layout}>
      <MenuItem {...rest} />
    </LayoutAction>
  );
};

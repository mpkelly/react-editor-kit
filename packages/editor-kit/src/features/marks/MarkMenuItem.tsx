import React from "react";
import { MarkAction } from "./MarkAction";
import { MenuItemProps, MenuItem } from "../menu/MenuItem";
import { ActionChildProps } from "../actions/Action";
import { usePlugin } from "../../plugins/usePlugin";
import { IconProvider } from "../icons/IconProviderPlugin";

export interface MarkMenuItemProps extends MenuItemProps {
  type: string;
  value?: any;
  hideOnIcon?: boolean;
}

export const MarkMenuItem = (props: MarkMenuItemProps) => {
  const { type, value, ...rest } = props;

  return (
    <MarkAction type={type} value={value}>
      <MenuItemBody type={type} {...rest} />
    </MarkAction>
  );
};

const MenuItemBody = (props: MarkMenuItemProps & ActionChildProps) => {
  let { type, icon, hideOnIcon, active, ...rest } = props;
  const { data: icons } = usePlugin("icon-provider") as IconProvider;
  if (!icon && !hideOnIcon && active) {
    icon = icons.checkIcon;
  }
  return (
    <MenuItem
      {...rest}
      active={active}
      data-mark-menu-item={type}
      icon={icon}
    />
  );
};

import React from "react";
import { MenuItemProps, MenuItem } from "../menu/MenuItem";
import { ActionChildProps, Action } from "../actions/Action";
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
    <Action plugin={type} args={value}>
      <MenuItemBody type={type} {...rest} />
    </Action>
  );
};

const MenuItemBody = (props: MarkMenuItemProps & ActionChildProps) => {
  let { type, icon, hideOnIcon, active, ...rest } = props;
  const { icons } = usePlugin<IconProvider>("icon-provider");
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

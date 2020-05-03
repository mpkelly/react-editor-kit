import React from "react";
import { MenuItemProps, MenuItem } from "../menu/MenuItem";
import { CodeAction } from "./CodeAction";

export interface CodeMenuItemProps extends Partial<MenuItemProps> {}

export const CodeMenuItem = (props: CodeMenuItemProps) => {
  return (
    <CodeAction>
      <MenuItem {...props} />
    </CodeAction>
  );
};

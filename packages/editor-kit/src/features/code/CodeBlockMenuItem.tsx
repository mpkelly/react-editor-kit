import React from "react";
import { MenuItemProps, MenuItem } from "../menu/MenuItem";
import { CodeBlockAction } from "./CodeBlockAction";

export interface CodeBlockMenuItemProps extends Partial<MenuItemProps> {}

export const CodeBlockMenuItem = (props: CodeBlockMenuItemProps) => {
  return (
    <CodeBlockAction>
      <MenuItem {...props} />
    </CodeBlockAction>
  );
};

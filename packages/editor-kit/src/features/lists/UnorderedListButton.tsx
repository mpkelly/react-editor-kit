import React from "react";
import { UnorderedListAction } from "./UnorderedListAction";
import { IconProps, IconButton } from "../buttons/IconButton";

export interface UnorderedListButtonProps extends IconProps {}

export const UnorderedListButton = (props: UnorderedListButtonProps) => {
  return (
    <UnorderedListAction>
      <IconButton {...props} data-id-button-unordered-list />
    </UnorderedListAction>
  );
};

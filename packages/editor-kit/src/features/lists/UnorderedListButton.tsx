import React from "react";
import { UnorderedListAction } from "./UnorderedListAction";
import { IconProps, IconButton } from "../buttons/IconButton";
import { TooltipContentProps } from "../popup/Tooltip";

export interface UnorderedListButtonProps
  extends IconProps,
    TooltipContentProps {}

export const UnorderedListButton = (props: UnorderedListButtonProps) => {
  return (
    <UnorderedListAction>
      <IconButton {...props} data-id-button-unordered-list />
    </UnorderedListAction>
  );
};

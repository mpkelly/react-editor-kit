import React from "react";
import { MarkButton } from "../marks/MarkButton";
import { TooltipContentProps } from "../popup/Tooltip";
import { IconProps } from "../buttons/IconButton";

export const UnderlineButton = (props: IconProps & TooltipContentProps) => {
  return <MarkButton {...props} type="underline" />;
};

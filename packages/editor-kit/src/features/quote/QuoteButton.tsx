import React from "react";
import { BlockButton } from "../blocks/BlockButton";
import { IconProps } from "../buttons/IconButton";
import { TooltipContentProps } from "../popup/Tooltip";

export const QuoteButton = (props: IconProps & TooltipContentProps) => {
  return <BlockButton {...props} type="quote" />;
};

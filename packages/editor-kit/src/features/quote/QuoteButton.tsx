import React from "react";
import { BlockButton } from "../blocks/BlockButton";
import { IconProps } from "../buttons/IconButton";

export const QuoteButton = (props: IconProps) => {
  return <BlockButton {...props} type="quote" />;
};

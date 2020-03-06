import React from "react";
import { MarkButton } from "../marks/MarkButton";
import { IconProps } from "../buttons/IconButton";

export const BoldButton = (props: IconProps) => {
  return <MarkButton {...props} type="bold" />;
};

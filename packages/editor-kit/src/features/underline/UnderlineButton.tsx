import React from "react";
import { IconProps } from "../buttons/IconButton";
import { MarkButton } from "../marks/MarkButton";

export const UnderlineButton = (props: IconProps) => {
  return <MarkButton {...props} type="underline" />;
};

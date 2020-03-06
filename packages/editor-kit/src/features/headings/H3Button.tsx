import React from "react";
import { HeadingAction } from "./HeadingAction";

export interface H3ButtonProps {
  children?: JSX.Element;
}

export const H3Button = (props: H3ButtonProps) => {
  const { children } = props;
  return <HeadingAction heading={"h3"}>{children}</HeadingAction>;
};

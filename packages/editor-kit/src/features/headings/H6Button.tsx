import React from "react";
import { HeadingAction } from "./HeadingAction";

export interface H6ButtonProps {
  children?: JSX.Element;
}

export const H6Button = (props: H6ButtonProps) => {
  const { children } = props;
  return <HeadingAction heading={"h6"}>{children}</HeadingAction>;
};

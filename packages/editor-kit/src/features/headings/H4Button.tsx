import React from "react";
import { HeadingAction } from "./HeadingAction";

export interface H4ButtonProps {
  children?: JSX.Element;
}

export const H4Button = (props: H4ButtonProps) => {
  const { children } = props;
  return <HeadingAction heading={"h4"}>{children}</HeadingAction>;
};

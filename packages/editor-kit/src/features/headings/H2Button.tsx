import React from "react";
import { HeadingAction } from "./HeadingAction";

export interface H2ButtonProps {
  children?: JSX.Element;
}

export const H2Button = (props: H2ButtonProps) => {
  const { children } = props;
  return <HeadingAction heading={"h2"}>{children}</HeadingAction>;
};

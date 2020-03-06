import React from "react";
import { HeadingAction } from "./HeadingAction";

export interface H1ButtonProps {
  children?: JSX.Element;
}

export const H1Button = (props: H1ButtonProps) => {
  const { children } = props;
  return <HeadingAction heading={"h1"}>{children}</HeadingAction>;
};

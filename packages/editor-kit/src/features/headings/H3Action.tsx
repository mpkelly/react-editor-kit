import React from "react";
import { HeadingAction } from "./HeadingAction";

export interface H3ActionProps {
  children: React.ReactNode;
}

export const H3Action = (props: H3ActionProps) => {
  const { children } = props;
  return <HeadingAction heading={"h3"}>{children}</HeadingAction>;
};

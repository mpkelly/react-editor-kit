import React from "react";
import { HeadingAction } from "./HeadingAction";

export interface H4ActionProps {
  children: JSX.Element;
}

export const H4Action = (props: H4ActionProps) => {
  return <HeadingAction heading={"h4"} {...props} />;
};

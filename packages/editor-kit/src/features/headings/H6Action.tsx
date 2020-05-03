import React from "react";
import { HeadingAction } from "./HeadingAction";

export interface H6ActionProps {
  children: React.ReactNode;
}

export const H6Action = (props: H6ActionProps) => {
  return <HeadingAction heading={"h6"} {...props} />;
};

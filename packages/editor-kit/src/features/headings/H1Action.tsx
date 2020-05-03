import React from "react";
import { HeadingAction } from "./HeadingAction";

export interface H1ActionProps {
  children: React.ReactNode;
}

export const H1ActionProps = (props: H1ActionProps) => {
  return <HeadingAction heading={"h1"} {...props} />;
};

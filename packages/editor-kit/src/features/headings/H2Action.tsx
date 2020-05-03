import React from "react";
import { HeadingAction } from "./HeadingAction";

export interface H2ActionProps {
  children: React.ReactNode;
}

export const H2Action = (props: H2ActionProps) => {
  return <HeadingAction heading={"h2"} {...props} />;
};

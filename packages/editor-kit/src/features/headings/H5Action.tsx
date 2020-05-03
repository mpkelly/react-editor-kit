import React from "react";
import { HeadingAction } from "./HeadingAction";

export interface H5ActionProps {
  children: React.ReactNode;
}

export const H5Action = (props: H5ActionProps) => {
  return <HeadingAction heading={"h5"} {...props} />;
};

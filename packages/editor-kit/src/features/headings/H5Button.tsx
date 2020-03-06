import React, { ReactNode } from "react";
import { HeadingAction } from "./HeadingAction";

export interface H5ButtonProps {
  children?: JSX.Element;
}

export const H5Button = (props: H5ButtonProps) => {
  const { children } = props;
  return <HeadingAction heading={"h5"}>{children}</HeadingAction>;
};

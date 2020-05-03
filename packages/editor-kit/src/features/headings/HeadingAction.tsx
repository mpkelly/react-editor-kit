import React from "react";
import { Action } from "../actions/Action";

export interface HeadingActionProps {
  heading: string;
  children: React.ReactNode;
}

export const HeadingAction = (props: HeadingActionProps) => {
  const { heading, ...rest } = props;

  return <Action plugin={heading} {...rest} />;
};

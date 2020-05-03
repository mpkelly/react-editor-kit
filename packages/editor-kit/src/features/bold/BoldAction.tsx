import React from "react";
import { Action } from "../actions/Action";

export interface BoldActionProps {
  children: React.ReactNode;
}

export const BoldAction = (props: BoldActionProps) => {
  return <Action {...props} plugin="bold" />;
};

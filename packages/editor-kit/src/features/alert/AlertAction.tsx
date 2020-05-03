import React from "react";
import { Action } from "../actions/Action";

export interface AlertActionProps {
  children: React.ReactNode;
  type: string;
}

export const AlertAction = (props: AlertActionProps) => {
  const { children, type } = props;
  return <Action plugin={type}>{children}</Action>;
};

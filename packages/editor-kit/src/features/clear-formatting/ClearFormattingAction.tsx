import React from "react";
import { Action } from "../actions/Action";

export interface ClearFormattingActionProps {
  children: React.ReactNode;
}

export const ClearFormattingAction = (props: ClearFormattingActionProps) => {
  const { children } = props;
  return <Action plugin={"clear-formatting"}>{children}</Action>;
};

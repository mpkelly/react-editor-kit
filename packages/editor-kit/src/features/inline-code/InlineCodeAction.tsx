import React from "react";
import { Action } from "../actions/Action";

export interface InlineCodeActionProps {
  children: React.ReactNode;
}

export const InlineCodeAction = (props: InlineCodeActionProps) => {
  return <Action {...props} plugin="inline-code" />;
};

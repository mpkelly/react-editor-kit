import React from "react";
import { Action } from "../actions/Action";

export interface CodeActionProps {
  children: React.ReactNode;
}

export const CodeAction = (props: CodeActionProps) => {
  return <Action plugin="code" {...props} />;
};

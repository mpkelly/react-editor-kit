import React from "react";
import { Action } from "../actions/Action";

export interface BlockquoteActionProps {
  children: React.ReactNode;
}

export const BlockquoteAction = (props: BlockquoteActionProps) => {
  return <Action {...props} plugin="blockquote" />;
};

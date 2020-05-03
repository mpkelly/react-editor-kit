import React from "react";
import { Action } from "../actions/Action";

export interface QuoteActionProps {
  children: React.ReactNode;
}

export const BlockquoteAction = (props: QuoteActionProps) => {
  return <Action {...props} plugin="blockquote" />;
};

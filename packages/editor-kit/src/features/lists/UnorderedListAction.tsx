import React from "react";
import { Action } from "../actions/Action";

export interface UnorderedListActionProps {
  children: React.ReactNode;
}

export const UnorderedListAction = (props: UnorderedListActionProps) => {
  return <Action plugin="unordered-list" {...props} />;
};

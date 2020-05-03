import React from "react";
import { Action } from "../actions/Action";

export interface SubscriptActionProps {
  children: React.ReactNode;
}

export const SubscriptAction = (props: SubscriptActionProps) => {
  return <Action {...props} plugin="subscript" />;
};

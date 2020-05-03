import React from "react";
import { Action } from "../actions/Action";

export interface SpoilerActionProps {
  children: React.ReactNode;
}

export const SpoilerAction = (props: SpoilerActionProps) => {
  return <Action plugin="spoiler" {...props} />;
};

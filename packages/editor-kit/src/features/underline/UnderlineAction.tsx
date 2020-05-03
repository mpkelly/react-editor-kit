import React from "react";
import { Action } from "../actions/Action";

export interface UnderlineActionProps {
  children: React.ReactNode;
}

export const UnderlineAction = (props: UnderlineActionProps) => {
  return <Action {...props} plugin="underline" />;
};

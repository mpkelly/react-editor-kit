import React from "react";
import { Action } from "../actions/Action";

export interface StrikethroughActionProps {
  children: React.ReactNode;
}

export const StrikethroughAction = (props: StrikethroughActionProps) => {
  return <Action {...props} plugin="strikethrough" />;
};

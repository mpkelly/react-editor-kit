import React from "react";
import { Action } from "../actions/Action";

export interface SuperscriptActionProps {
  children: React.ReactNode;
}

export const SuperscriptAction = (props: SuperscriptActionProps) => {
  return <Action {...props} plugin="superscript" />;
};

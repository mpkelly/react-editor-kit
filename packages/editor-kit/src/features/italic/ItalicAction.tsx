import React from "react";
import { Action } from "../actions/Action";

export interface ItalicActionProps {
  children: React.ReactNode;
}

export const ItalicAction = (props: ItalicActionProps) => {
  return <Action {...props} plugin="italic" />;
};

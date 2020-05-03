import React from "react";
import { Action } from "../actions/Action";

export interface InitialLetterActionProps {
  children: React.ReactNode;
}

export const InitialLetterAction = (props: InitialLetterActionProps) => {
  return <Action plugin="initial-letter" {...props} />;
};

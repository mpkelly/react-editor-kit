import React from "react";
import { Action } from "../actions/Action";

export interface TextAlignActionProps {
  children: React.ReactNode;
  textAlign: string;
}

export const TextAlignAction = (props: TextAlignActionProps) => {
  const { children, textAlign } = props;
  return (
    <Action plugin={"text-align"} args={{ textAlign }}>
      {children}
    </Action>
  );
};

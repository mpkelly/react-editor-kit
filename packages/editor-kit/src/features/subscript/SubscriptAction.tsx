import React from "react";
import { MarkAction } from "../marks/MarkAction";

export interface SubscriptActionProps {
  children: JSX.Element;
}

export const SubscriptAction = (props: SubscriptActionProps) => {
  return <MarkAction {...props} type="sub" />;
};

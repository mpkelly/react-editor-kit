import React from "react";
import { MarkAction } from "../marks/MarkAction";

export interface SubscriptActionProps {
  children: React.ReactNode;
}

export const SubscriptAction = (props: SubscriptActionProps) => {
  return <MarkAction {...props} type="sub" />;
};

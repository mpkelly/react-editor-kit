import React from "react";
import { MarkAction } from "../marks/MarkAction";

export interface BoldActionProps {
  children: React.ReactNode;
}

export const BoldAction = (props: BoldActionProps) => {
  return <MarkAction {...props} type="bold" />;
};

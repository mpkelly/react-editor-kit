import React from "react";
import { MarkAction } from "../marks/MarkAction";

export interface BoldActionProps {
  children: JSX.Element;
}

export const BoldAction = (props: BoldActionProps) => {
  return <MarkAction {...props} type="bold" />;
};

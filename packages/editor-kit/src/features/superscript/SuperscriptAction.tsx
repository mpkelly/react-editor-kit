import React from "react";
import { MarkAction } from "../marks/MarkAction";

export interface SuperscriptActionProps {
  children: React.ReactNode;
}

export const SuperscriptAction = (props: SuperscriptActionProps) => {
  return <MarkAction {...props} type="super" />;
};

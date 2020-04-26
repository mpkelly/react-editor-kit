import React from "react";
import { MarkAction } from "../marks/MarkAction";

export interface ItalicActionProps {
  children: React.ReactNode;
}

export const ItalicAction = (props: ItalicActionProps) => {
  return <MarkAction {...props} type="italic" />;
};

import React from "react";
import { MarkAction } from "../marks/MarkAction";

export interface ItalicActionProps {
  children: JSX.Element;
}

export const ItalicAction = (props: ItalicActionProps) => {
  return <MarkAction {...props} type="italic" />;
};

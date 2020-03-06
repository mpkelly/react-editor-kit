import React from "react";
import { MarkAction } from "../marks/MarkAction";

export interface UnderlineActionProps {
  children: JSX.Element;
}

export const UnderlineAction = (props: UnderlineActionProps) => {
  return <MarkAction {...props} type="underline" />;
};

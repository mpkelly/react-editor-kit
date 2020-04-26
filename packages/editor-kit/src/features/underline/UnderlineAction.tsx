import React from "react";
import { MarkAction } from "../marks/MarkAction";

export interface UnderlineActionProps {
  children: React.ReactNode;
}

export const UnderlineAction = (props: UnderlineActionProps) => {
  return <MarkAction {...props} type="underline" />;
};

import React from "react";
import { MarkAction } from "../marks/MarkAction";

export interface StrikethroughActionProps {
  children: JSX.Element;
}

export const StrikethroughAction = (props: StrikethroughActionProps) => {
  return <MarkAction {...props} type="strikethrough" />;
};

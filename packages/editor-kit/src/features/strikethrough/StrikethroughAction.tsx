import React from "react";
import { MarkAction } from "../marks/MarkAction";

export interface StrikethroughActionProps {
  children: React.ReactNode;
}

export const StrikethroughAction = (props: StrikethroughActionProps) => {
  return <MarkAction {...props} type="strikethrough" />;
};

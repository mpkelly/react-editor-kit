import React from "react";
import { MarkAction } from "../marks/MarkAction";

export interface InlineCodeActionProps {
  children: React.ReactNode;
}

export const InlineCodeAction = (props: InlineCodeActionProps) => {
  return <MarkAction {...props} type="inline-code" />;
};

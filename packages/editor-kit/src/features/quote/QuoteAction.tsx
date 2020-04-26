import React from "react";
import { BlockAction } from "../blocks/BlockAction";

export interface QuoteActionProps {
  children: React.ReactNode;
}

export const QuoteAction = (props: QuoteActionProps) => {
  return <BlockAction {...props} type="quote" />;
};

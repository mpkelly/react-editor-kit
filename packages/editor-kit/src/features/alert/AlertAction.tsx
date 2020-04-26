import React from "react";
import { BlockAction } from "../blocks/BlockAction";

export interface AlertActionProps {
  children: React.ReactNode;
  type: string;
}

export const AlertAction = (props: AlertActionProps) => {
  const { children, type } = props;

  return <BlockAction type={type}>{children}</BlockAction>;
};

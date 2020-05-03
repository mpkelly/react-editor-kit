import React from "react";

import { Action } from "../actions/Action";

export interface LinkActionProps {
  children: React.ReactNode;
}

export const LinkAction = (props: LinkActionProps) => {
  return <Action plugin="link" {...props} />;
};

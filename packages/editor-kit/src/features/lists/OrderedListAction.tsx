import React from "react";
import { Action } from "../actions/Action";

export interface OrderedListActionProps {
  children: React.ReactNode;
}

export const OrderedListAction = (props: OrderedListActionProps) => {
  return <Action plugin="ordered-list" {...props} />;
};

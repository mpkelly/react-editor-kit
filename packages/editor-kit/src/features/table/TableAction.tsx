import React from "react";
import { Action } from "../actions/Action";

export interface TableActionProps {
  children: React.ReactNode;
}

export const TableAction = (props: TableActionProps) => {
  return (
    <Action plugin="table" {...props}/>
  );
};

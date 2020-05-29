import React from "react";
import { Action } from "../actions/Action";

export interface LayoutActionProps {
  children: React.ReactNode;
  layout: number[];
}

export const LayoutAction = (props: LayoutActionProps) => {
  const { layout, ...rest } = props;
  return (
    <Action args={{ layout }} plugin="layout" {...rest} restoreSelection />
  );
};

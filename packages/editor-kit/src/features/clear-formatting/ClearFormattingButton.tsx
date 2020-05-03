import React from "react";
import { ActionButton, ActionButtonProps } from "../actions/ActionButton";

export const ClearFormattingButton = (props: ActionButtonProps) => {
  return <ActionButton {...props} plugin="clear-formatting" />;
};

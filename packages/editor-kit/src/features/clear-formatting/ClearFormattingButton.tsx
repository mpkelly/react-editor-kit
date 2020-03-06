import React from "react";
import { IconProps, IconButton } from "../buttons/IconButton";
import { ClearFormattingAction } from "./ClearFormattingAction";

export interface ClearFormattingButtonProps extends IconProps {
  formats?: string[];
}

export const ClearFormattingButton = (props: ClearFormattingButtonProps) => {
  const { formats, ...rest } = props;
  return (
    <ClearFormattingAction {...formats}>
      <IconButton {...rest} />
    </ClearFormattingAction>
  );
};

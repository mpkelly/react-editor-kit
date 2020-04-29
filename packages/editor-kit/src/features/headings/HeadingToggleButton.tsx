import React, { memo } from "react";
import { IconButton, IconProps } from "../buttons/IconButton";
import { HeadingToggleAction } from "./HeadingToggleAction";
import { TooltipContentProps } from "../popup/Tooltip";

export interface HeadingToggleButtonProps
  extends IconProps,
    TooltipContentProps {
  heading?: string;
}

export const HeadingToggleButton = (props: HeadingToggleButtonProps) => {
  const { heading, ...rest } = props;
  return (
    <HeadingToggleAction heading={heading}>
      <IconButton {...rest} />
    </HeadingToggleAction>
  );
};

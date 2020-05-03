import React from "react";
import { IconProps } from "../buttons/IconButton";
import { TooltipContentProps } from "../popup/Tooltip";
import { ActionButton } from "../actions/ActionButton";

export interface HeadingToggleButtonProps
  extends IconProps,
    TooltipContentProps {
  heading?: string;
}

export const HeadingToggleButton = (props: HeadingToggleButtonProps) => {
  const { heading, ...rest } = props;
  return <ActionButton plugin="heading-toggle" args={{ heading }} {...rest} />;
};

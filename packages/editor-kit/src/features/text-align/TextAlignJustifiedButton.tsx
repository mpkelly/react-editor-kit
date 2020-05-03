import React from "react";
import { IconProps } from "../buttons/IconButton";
import { TooltipContentProps } from "../popup/Tooltip";
import { ActionButton } from "../actions/ActionButton";

export const TextAlignJustifiedButton = (
  props: IconProps & TooltipContentProps
) => {
  return (
    <ActionButton
      plugin="text-align"
      args={{ textAlign: "justified" }}
      {...props}
    />
  );
};

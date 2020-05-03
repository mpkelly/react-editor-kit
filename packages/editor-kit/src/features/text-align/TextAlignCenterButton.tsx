import React from "react";
import { IconProps } from "../buttons/IconButton";
import { ActionButton } from "../actions/ActionButton";
import { TooltipContentProps } from "../popup/Tooltip";

export const TextAlignCenterButton = (
  props: IconProps & TooltipContentProps
) => {
  return (
    <ActionButton
      plugin="text-align"
      args={{ textAlign: "center" }}
      {...props}
    />
  );
};

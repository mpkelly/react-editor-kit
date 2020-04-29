import React from "react";
import { IconProps, IconButton } from "../buttons/IconButton";
import { SpoilerAction } from "./SpoilerAction";
import { TooltipContentProps } from "../popup/Tooltip";

export const SpoilerButton = (props: IconProps & TooltipContentProps) => {
  const { className, ligature, ...rest } = props;
  return (
    <SpoilerAction>
      <IconButton className={className} ligature={ligature} {...rest} />
    </SpoilerAction>
  );
};

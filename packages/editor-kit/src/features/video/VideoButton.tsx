import React from "react";
import { IconProps, IconButton } from "../buttons/IconButton";
import { VideoAction } from "./VideoAction";
import { TooltipContentProps } from "../popup/Tooltip";

export const VideoButton = (props: IconProps & TooltipContentProps) => {
  return (
    <VideoAction>
      <IconButton {...props} />
    </VideoAction>
  );
};

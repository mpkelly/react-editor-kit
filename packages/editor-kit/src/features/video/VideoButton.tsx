import React from "react";
import { IconProps, IconButton } from "../buttons/IconButton";
import { VideoAction } from "./VideoAction";

export const VideoButton = (props: IconProps) => {
  return (
    <VideoAction>
      <IconButton {...props} />
    </VideoAction>
  );
};

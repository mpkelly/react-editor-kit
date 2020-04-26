import React from "react";
import { MenuItemProps, MenuItem } from "../menu/MenuItem";
import { VideoAction } from "./VideoAction";

export interface VideoMenuItemProps extends Partial<MenuItemProps> {}

export const VideoMenuItem = (props: VideoMenuItemProps) => {
  return (
    <VideoAction>
      <MenuItem {...props} />
    </VideoAction>
  );
};

import React from "react";
import { Action } from "../actions/Action";

export interface VideoActionProps {
  children: React.ReactNode;
}

export const VideoAction = (props: VideoActionProps) => {
  return <Action plugin="video" {...props} />;
};

import React, { memo } from "react";
import { IconProps, IconButton } from "../buttons/IconButton";
import { SpoilerAction } from "./SpoilerAction";

export const SpoilerButton = (props: IconProps) => {
  const { className, ligature } = props;
  return (
    <SpoilerAction>
      <IconButton className={className} ligature={ligature} />
    </SpoilerAction>
  );
};

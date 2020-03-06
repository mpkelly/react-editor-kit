import React from "react";
import { IconProps, IconButton } from "../buttons/IconButton";
import { LinkAction } from "./LinkAction";

export const LinkButton = (props: IconProps) => {
  const { className, ligature } = props;
  return (
    <LinkAction>
      <IconButton
        className={className}
        ligature={ligature}
        data-inline-button="link"
      />
    </LinkAction>
  );
};

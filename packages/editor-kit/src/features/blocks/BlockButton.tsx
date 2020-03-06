import React from "react";
import { IconProps, IconButton } from "../buttons/IconButton";
import { BlockAction } from "./BlockAction";

export interface BlockButtonProps extends IconProps {
  type: string;
}

export const BlockButton = (props: BlockButtonProps) => {
  const { type, ligature, className } = props;
  return (
    <BlockAction type={type}>
      <IconButton
        className={className}
        ligature={ligature}
        data-block-button={type}
      />
    </BlockAction>
  );
};

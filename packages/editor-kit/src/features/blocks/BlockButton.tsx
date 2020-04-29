import React from "react";
import { IconProps, IconButton } from "../buttons/IconButton";
import { BlockAction } from "./BlockAction";
import { TooltipContentProps } from "../popup/Tooltip";

export interface BlockButtonProps extends IconProps, TooltipContentProps {
  type: string;
}

export const BlockButton = (props: BlockButtonProps) => {
  const { type, ligature, className, ...rest } = props;
  return (
    <BlockAction type={type}>
      <IconButton
        className={className}
        ligature={ligature}
        data-block-button={type}
        {...rest}
      />
    </BlockAction>
  );
};

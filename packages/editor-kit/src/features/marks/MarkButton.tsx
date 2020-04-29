import React from "react";
import { IconProps, IconButton } from "../buttons/IconButton";
import { MarkAction } from "./MarkAction";
import { TooltipContentProps } from "../popup/Tooltip";

export interface MarkButtonProps extends IconProps, TooltipContentProps {
  type: string;
  value?: any;
}

export const MarkButton = (props: MarkButtonProps) => {
  const { type, value, ligature, className, ...rest } = props;
  return (
    <MarkAction type={type} value={value}>
      <IconButton
        className={className}
        ligature={ligature}
        data-mark-button={type}
        {...rest}
      />
    </MarkAction>
  );
};

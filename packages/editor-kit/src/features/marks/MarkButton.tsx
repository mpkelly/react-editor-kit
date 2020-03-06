import React from "react";
import { IconProps, IconButton } from "../buttons/IconButton";
import { MarkAction } from "./MarkAction";

export interface MarkButtonProps extends IconProps {
  type: string;
  value?: any;
}

export const MarkButton = (props: MarkButtonProps) => {
  const { type, value, ligature, className } = props;
  return (
    <MarkAction type={type} value={value}>
      <IconButton
        className={className}
        ligature={ligature}
        data-mark-button={type}
      />
    </MarkAction>
  );
};

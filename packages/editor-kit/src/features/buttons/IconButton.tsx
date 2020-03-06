import React from "react";
import { ActionChildProps } from "../actions/Action";

export interface IconProps {
  className: string;
  ligature?: string;
}

export interface IconButtonProps extends ActionChildProps, IconProps {}

export const IconButton = (props: IconButtonProps) => {
  const { active, onMouseDown, className, ligature, disabled, ...rest } = props;
  const activeClass = active ? "active" : "";
  const disabledClass = disabled ? "rek-disabled" : "";
  const clazz = `rek-icon-button rek-icon rek-css-icon ${className} ${activeClass} ${disabledClass}`;

  return (
    <span className={clazz} onMouseDown={onMouseDown} {...rest}>
      {ligature}
    </span>
  );
};

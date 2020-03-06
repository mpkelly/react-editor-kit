import React from "react";
import { IconProps, IconButton } from "../../buttons/IconButton";
import { ColorPickerAction } from "./ColorPickerAction";

export const ColorPickerButton = (props: IconProps) => {
  const { className, ligature } = props;
  return (
    <ColorPickerAction>
      <IconButton className={className} ligature={ligature} />
    </ColorPickerAction>
  );
};

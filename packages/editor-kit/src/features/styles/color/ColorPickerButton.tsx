import React from "react";
import { IconProps, IconButton } from "../../buttons/IconButton";
import { ColorPickerAction, Color } from "./ColorPickerAction";

export interface ColorPickerButtonProps extends IconProps {
  colors?: Color[][];
}

export const ColorPickerButton = (props: ColorPickerButtonProps) => {
  const { className, ligature, colors } = props;
  return (
    <ColorPickerAction colors={colors}>
      <IconButton className={className} ligature={ligature} />
    </ColorPickerAction>
  );
};

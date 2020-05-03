import React, { FunctionComponent } from "react";
import { IconProps, IconButton } from "../buttons/IconButton";
import { ColorPickerAction, Color } from "./ColorPickerAction";
import { TooltipContentProps } from "../popup/Tooltip";

export interface ColorPickerButtonProps extends IconProps, TooltipContentProps {
  colors?: Color[][];
}

export const ColorPickerButton: FunctionComponent<ColorPickerButtonProps> = (
  props: ColorPickerButtonProps
) => {
  const { className, ligature, colors, ...rest } = props;
  return (
    <ColorPickerAction colors={colors}>
      <IconButton className={className} ligature={ligature} {...rest} />
    </ColorPickerAction>
  );
};

export const DefaultColors: Color[][] = [
  ["#FF1744", "#F44336", "#EF5350", "#E57373", "#EF9A9A"],
  ["#651FFF", "#673AB7", "#7E57C2", "#9575CD", "#B39DDB"],
  ["#2979FF", "#2196F3", "#42A5F5", "#64B5F6", "#90CAF9"],
  ["#1DE9B6", "#009688", "#26A69A", "#4DB6AC", "#80CBC4"],
  ["#FF9100", "#FF9800", "#FFA726", "#FFB74D", "#FFCC80"],
  ["#212121", "#424242", "#616161", "#757575", "#9E9E9E"],
];

ColorPickerButton.defaultProps = {
  colors: DefaultColors,
};

import React, { Fragment, useState, useRef } from "react";
import { Action } from "../../actions/Action";
import { ColorPicker, getCssColor } from "./ColorPicker";
import { useEditorKit } from "../../../editor/EditorKit";
import { marks } from "../../marks/Marks";
import { block } from "../../../ui/Utils";
import { ModalPopup } from "../../popup/HtmlElementModalPopup";

export interface ColorPickerActionProps {
  children: JSX.Element;
  colors?: Color[][];
}

export type HexColor = string;
export type HslaColor = { h: number; s: number; l: number; a?: number };
export type RgbaColor = { r: number; g: number; b: number; a?: number };
export type Color = HexColor | HslaColor | RgbaColor | "transparent";

export const ColorPickerAction = (props: ColorPickerActionProps) => {
  const { children, colors } = props;
  const { editor } = useEditorKit();

  const [show, setShow] = useState(false);
  const element = useRef<HTMLElement | null>();

  const toggleShow = () => {
    setShow(show => !show);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();
    toggleShow();
  };

  const isActive = () => {
    return show;
  };

  const handleColorChange = (color: Color) => {
    editor.addMark("fontColor", getCssColor(color));
    setShow(false);
  };

  const handleBackgroundColorChange = (color: Color) => {
    editor.addMark("backgroundColor", getCssColor(color));
    setShow(false);
  };

  const handleRef = (ref: HTMLElement | null) => {
    element.current = ref;
  };

  const colorMark = marks(editor).find(mark => mark.key === "fontColor");
  const color = colorMark ? colorMark.value : "blue";
  const backgroundColorMark = marks(editor).find(
    mark => mark.key === "backgroundColor"
  );
  const backgroundColor = backgroundColorMark
    ? backgroundColorMark.value
    : "blue";

  const enabled = editor.isMarkSupported("fontColor");

  return (
    <Fragment>
      <div ref={handleRef}>
        <Action
          onMouseDown={handleMouseDown}
          isActive={isActive}
          disabled={!enabled}
        >
          {children}
        </Action>
      </div>
      <ModalPopup
        show={show}
        element={element.current as HTMLElement}
        onClickOutside={toggleShow}
        location="bottom"
      >
        <ColorPicker
          color={color}
          backgroundColor={backgroundColor}
          onColorChange={handleColorChange}
          onBackgroundColorChange={handleBackgroundColorChange}
          colors={colors || DefaultColors}
        />
      </ModalPopup>
    </Fragment>
  );
};

const DefaultColors: Color[][] = [
  ["#FF1744", "#F44336", "#EF5350", "#E57373", "#EF9A9A"],
  ["#651FFF", "#673AB7", "#7E57C2", "#9575CD", "#B39DDB"],
  ["#2979FF", "#2196F3", "#42A5F5", "#64B5F6", "#90CAF9"],
  ["#1DE9B6", "#009688", "#26A69A", "#4DB6AC", "#80CBC4"],
  ["#FF9100", "#FF9800", "#FFA726", "#FFB74D", "#FFCC80"],
  ["#212121", "#424242", "#616161", "#757575", "#9E9E9E"]
];

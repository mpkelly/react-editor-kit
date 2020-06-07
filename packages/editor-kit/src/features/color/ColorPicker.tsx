import React from "react";
import { usePlugin } from "../../plugins/usePlugin";
import { LabelsPlugin } from "../i18n/LabelsPlugin";
import { Color, HslaColor, RgbaColor } from "./ColorPickerAction";
import { blockEvent } from "../../ui/Utils";
import { DefaultColors } from "./ColorPickerButton";
import { Show } from "../../ui/Show";

export interface ColorPickerProps {
  color: Color;
  backgroundColor: Color;
  onColorChange(color: Color | null): void;
  onBackgroundColorChange(color: Color | null): void;
  colors?: Color[][];
}

export const ColorPicker = (props: ColorPickerProps) => {
  const { color, onColorChange, onBackgroundColorChange, colors } = props;
  const { labels } = usePlugin<LabelsPlugin>("label-provider");

  return (
    <div className="rek-color-picker rek-panel">
      <ColorPanel
        color={color}
        onChange={onColorChange}
        colors={colors || DefaultColors}
        title={labels.textColor}
      />
      <ColorPanel
        color={color}
        onChange={onBackgroundColorChange}
        colors={colors || DefaultColors}
        title={labels.backgroundColor}
      />
    </div>
  );
};

export interface ColorPanelProps {
  color: any;
  onChange(color: Color | null): void;
  colors: Color[][];
  title: string;
}

const ColorPanel = (props: ColorPanelProps) => {
  const { color: selected, colors, onChange, title } = props;
  return (
    <div className="rek-color-picker-panel">
      <span className={"rek-text rek-secondary small"}>{title}</span>
      {colors.map((row: any[], index: number) => {
        const isLastRow = index + 1 === colors.length;
        return (
          <div className="rek-color-picker-row" key={index}>
            {row.map((color) => {
              const selectedClass =
                color === selected ? "rek-selected-color" : "";
              return (
                <div
                  className={`rek-color-picker-color ${selectedClass}`}
                  onClick={(event) => {
                    blockEvent(event);
                    onChange(color);
                  }}
                  onMouseDown={blockEvent}
                  style={{ backgroundColor: getCssColor(color) }}
                />
              );
            })}
            <Show when={isLastRow}>
              <div
                className={`rek-color-picker-nocolor`}
                onClick={(event) => {
                  blockEvent(event);
                  onChange(null);
                }}
                onMouseDown={blockEvent}
              />
            </Show>
          </div>
        );
      })}
    </div>
  );
};

export const getCssColor = (color: Color) => {
  if (color === null) {
    return undefined;
  }
  if ((color as any)["r"]) {
    const { r, g, b, a } = color as RgbaColor;
    const _a = a == undefined ? 1 : a;
    return `rgba(${r}, ${g}, ${b}, ${_a})`;
  } else if ((color as any)["h"]) {
    const { h, s, l, a } = color as HslaColor;
    const _a = a == undefined ? 1 : a;
    return `hsla(${h}, ${s}, ${l}, ${_a})`;
  }
  return color as string;
};

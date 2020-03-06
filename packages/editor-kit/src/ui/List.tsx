import React, { CSSProperties, useCallback } from "react";
import { stop } from "./Utils";

export interface ListProps {
  items: ListItem[];
  activeIndex?: number;
  className?: string;
  style?: CSSProperties;
}

export interface ListItem {
  text?: string;
  onClick?(event?: React.MouseEvent<HTMLElement, MouseEvent>): void;
  style?: CSSProperties;
  disabled?: boolean;
}

export const ensureInView = (element: HTMLElement | null) => {
  if (element) {
    element.scrollIntoView();
  }
};

export const List = (props: ListProps) => {
  const { items, className, activeIndex, style } = props;
  const clazz = className || "";

  return (
    <div
      className={`rek-panel rek-list ${clazz}`}
      onMouseDown={stop}
      style={style}
    >
      {items.map((item: ListItem, index: number) => {
        const isActive = index === activeIndex;
        const activeClass = isActive ? "active" : "";
        const disabledClass = item.disabled ? "rek-disabled" : "";
        const ref = isActive ? ensureInView : undefined;
        return (
          <li
            ref={ref}
            key={item.text}
            className={`rek-list-item ${activeClass} ${disabledClass}`}
            onClick={item.disabled ? undefined : item.onClick}
            style={item.style}
          >
            {item.text}
          </li>
        );
      })}
    </div>
  );
};

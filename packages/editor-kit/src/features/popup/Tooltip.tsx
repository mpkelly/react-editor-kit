import React from "react";
import { Node } from "slate";
import { HoverPopup } from "./HoverPopup";

export interface TooltipProps {
  element: Node;
  text?: string;
}

export const Tooltip = (props: TooltipProps) => {
  const { text, element } = props;
  if (!text) {
    return null;
  }
  return (
    <HoverPopup element={element} hideWhenFocusedWithin fixed location="top">
      <div className="rek-editor-tooltip">
        <span className="rek-text rek-primary">{text}</span>
      </div>
    </HoverPopup>
  );
};

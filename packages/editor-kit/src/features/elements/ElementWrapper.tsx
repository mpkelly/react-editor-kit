import React, { useState } from "react";
import { RenderElementProps } from "slate-react";
import { useFocused } from "../../editor/Focus";
import { ElementToolbar } from "../toolbar/ElementToolbar";
import { Show } from "../../ui/Show";

export interface ElementWrapperProps extends RenderElementProps {
  className?: string;
  focusToolbar?: JSX.Element | JSX.Element[];
  inline?: boolean;
}

export const ElementWrapper = (props: ElementWrapperProps) => {
  const { children, element, focusToolbar, inline, ...rest } = props;
  const { isFocusedWithin } = useFocused(element);
  const [inside, setInside] = useState(false);
  const className = props.className || "";
  const inlineClassName = inline ? "rek-inline" : "";

  const handleEnter = () => {
    setInside(true);
  };
  const handleLeave = () => {
    setInside(false);
  };

  return (
    <div
      className={`rek-element-wrapper ${inlineClassName} ${className}`}
      data-slate-zero-width="z"
    >
      <Show when={isFocusedWithin || inside}>
        <div
          contentEditable={false}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          style={{ position: "absolute", marginTop: -32, zIndex: 2 }}
        >
          <ElementToolbar>{focusToolbar}</ElementToolbar>
        </div>
      </Show>
      <div className="rek-element-wrapper-content">{children}</div>
    </div>
  );
};

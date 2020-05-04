import React, { useState } from "react";
import { RenderElementProps } from "slate-react";
import { useFocused } from "../../editor/Focus";
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
  const focusClassName = isFocusedWithin ? "rek-focused" : "";
  const inlineClassName = inline ? "rek-inline" : "";

  const handleEnter = () => {
    setInside(true);
  };
  const handleLeave = () => {
    setInside(false);
  };

  return (
    <div
      className={`rek-element-wrapper ${inlineClassName} ${focusClassName} ${className}`}
      data-slate-zero-width="z"
    >
      <div className="rek-element-wrapper-content">{children}</div>
      <Show when={isFocusedWithin || inside}>
        <div
          contentEditable={false}
          className="rek-toolbar rek-panel"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {focusToolbar}
        </div>
      </Show>
    </div>
  );
};

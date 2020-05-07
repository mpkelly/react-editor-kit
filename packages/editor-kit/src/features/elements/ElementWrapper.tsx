import React, { useState } from "react";
import { RenderElementProps } from "slate-react";
import { useFocused } from "../../editor/Focus";
import { ElementToolbar } from "../toolbar/ElementToolbar";
import { ModalPopup } from "../popup/ElementModalPopup";

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
      <div className="rek-element-wrapper-content">{children}</div>

      <ModalPopup
        show={isFocusedWithin || inside}
        element={element}
        location={"top"}
        offsets={{ v: -16 }}
      >
        <div
          contentEditable={false}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <ElementToolbar>{focusToolbar}</ElementToolbar>
        </div>
      </ModalPopup>
    </div>
  );
};

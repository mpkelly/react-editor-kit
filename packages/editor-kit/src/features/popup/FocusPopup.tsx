import React, { useState, useCallback, useEffect, memo } from "react";
import { Element } from "slate";
import { useFocused } from "../../editor/Focus";
import { useEditorKit } from "../../editor/EditorKit";
import { ReactEditor } from "slate-react";
import { getPosition, Location, Offsets } from "./Popups";
import { PopupContent } from "./PopupContent";
import { useHover } from "../../editor/Hover";
import { Portal } from "./Portal";

export interface FocusPopupProps {
  element: Element;
  location?: Location;
  children: JSX.Element;
  offsets?: Offsets;
  fixed?: boolean;
}

export const FocusPopup = memo((props: FocusPopupProps) => {
  const { element, location, children, offsets, fixed } = props;
  const { editor } = useEditorKit();
  const [domElement, setDomElement] = useState<HTMLElement | null>(null);
  const handleRef = useCallback((ref: HTMLElement) => {
    setDomElement(ref);
  }, []);
  useEffect(() => {
    setDomElement(null);
  }, [element]);
  const { isFocusedWithin } = useFocused(element);
  const over = useHover(domElement);

  if (!isFocusedWithin && !over) {
    return null;
  }

  const htmlElement = ReactEditor.toDOMNode(editor, element);
  const anchorBounds = htmlElement.getBoundingClientRect();

  const style = getPosition(
    domElement ? domElement.getBoundingClientRect() : anchorBounds,
    anchorBounds,
    location,
    fixed,
    offsets
  );

  const content = (
    <PopupContent ref={handleRef} style={style}>
      {children}
    </PopupContent>
  );
  if (fixed) {
    return <Portal>{content}</Portal>;
  }
  return content;
});

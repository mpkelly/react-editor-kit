import React, { useState, useEffect } from "react";
import { getPosition, Location, Offsets } from "./Popups";
import { PopupContent } from "./PopupContent";
import { Overlay } from "../../ui/Popup";
import { Portal } from "./Portal";

export interface CursorPopupProps {
  location?: Location;
  children: React.ReactNode;
  onClose?(): void;
  fixed?: boolean;
  offsets?: Offsets;
  expanded?: boolean;
  delay?: number;
}

export const CursorPopup = (props: CursorPopupProps) => {
  const {
    location: position,
    children,
    fixed,
    onClose,
    offsets,
    expanded,
    delay,
  } = props;
  const { range, length } = getCursor();
  const [show, setShow] = useState(!delay);
  const [contentElement, setContentElement] = useState<HTMLElement>();
  const [rect] = useState(range ? range.getBoundingClientRect() : null);

  const handleContent = (element?: HTMLElement) => {
    setContentElement(element);
  };

  useEffect(() => {
    if (!delay) {
      return;
    }
    const timeout = setTimeout(() => {
      setShow(true);
    }, delay || 1000);
    return () => clearTimeout(timeout);
  }, [delay, length]);

  if (expanded && length < 1) {
    return null;
  }

  if (!rect) {
    return null;
  }

  if (!show) {
    return null;
  }
  const bounds = contentElement ? contentElement.getBoundingClientRect() : rect;
  const style = getPosition(bounds, rect, position, fixed, offsets);
  let content = <PopupContent style={style}>{children}</PopupContent>;

  if (onClose) {
    content = <Overlay onClick={onClose}>{content}</Overlay>;
  }

  if (fixed) {
    return (
      <Portal>
        <PopupContent style={style} ref={handleContent}>
          {children}
        </PopupContent>
      </Portal>
    );
  }
  return content;
};

export const getCursor = () => {
  const selection = window.getSelection();
  const range =
    selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
  const length = range ? String(range).length : 0;
  return { range, length };
};

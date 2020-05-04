import React, { useState, useCallback, CSSProperties } from "react";
import ResizeSensor from "react-resize-detector";
import { PopupContent } from "./PopupContent";
import { Overlay } from "../../ui/Popup";
import { getPosition, Location, Offsets } from "./Popups";
import { Portal } from "./Portal";

export interface HtmlElementModalPopupProps {
  element: HTMLElement | null;
  children: React.ReactNode;
  location?: Location;
  onClickOutside?(event?: React.MouseEvent<HTMLElement, MouseEvent>): void;
  show: boolean;
  offsets?: Offsets;
}

export const HtmlElementModalPopup = (props: HtmlElementModalPopupProps) => {
  const { element, location, children, onClickOutside, show, offsets } = props;
  const [domElement, setDomElement] = useState<HTMLElement | null>(null);
  const [, update] = useState({});
  const handleRef = useCallback((ref: HTMLElement) => {
    setDomElement(ref);
  }, []);

  const forceUpdate = () => {
    update({});
  };

  if (!show || !element) {
    return null;
  }

  let style: CSSProperties = {};
  if (domElement) {
    const anchor = element.getBoundingClientRect();
    const bounds = domElement.getBoundingClientRect();
    style = getPosition(bounds, anchor, location, true, offsets);
  }

  return (
    <Portal>
      <Overlay onClick={onClickOutside}>
        <ResizeSensor handleWidth onResize={forceUpdate}>
          <PopupContent ref={handleRef} style={style}>
            {children}
          </PopupContent>
        </ResizeSensor>
      </Overlay>
    </Portal>
  );
};

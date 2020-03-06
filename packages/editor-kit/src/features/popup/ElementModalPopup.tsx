import React, { useState, useCallback, CSSProperties, memo } from "react";
import { Element } from "slate";
import { PopupContent } from "./PopupContent";
import { Overlay } from "../../ui/Popup";
import { ReactEditor } from "slate-react";
import { useEditorKit } from "../../editor/EditorKit";
import { getPosition, Location, Offsets } from "./Popups";
import { Portal } from "./Portal";

export interface ModalPopupProps {
  element: Element;
  children: JSX.Element;
  onClickOutside?(event?: React.MouseEvent<HTMLElement, MouseEvent>): void;
  show: boolean;
  location?: Location;
  offsets?: Offsets;
}

export const ModalPopup = (props: ModalPopupProps) => {
  const { element, children, onClickOutside, show, location, offsets } = props;
  const { editor } = useEditorKit();
  const [domElement, setDomElement] = useState<HTMLElement | null>(null);
  const handleRef = useCallback((ref: HTMLElement) => {
    setDomElement(ref);
  }, []);

  if (!show) {
    return null;
  }

  let style: CSSProperties = {};
  if (domElement) {
    const htmlElement = ReactEditor.toDOMNode(editor, element);
    const anchorBounds = htmlElement.getBoundingClientRect();
    const bounds = domElement.getBoundingClientRect();
    style = getPosition(bounds, anchorBounds, location, true, offsets);
  }

  return (
    <Portal>
      <Overlay onClick={onClickOutside}>
        <PopupContent ref={handleRef} style={style}>
          {children}
        </PopupContent>
      </Overlay>
    </Portal>
  );
};

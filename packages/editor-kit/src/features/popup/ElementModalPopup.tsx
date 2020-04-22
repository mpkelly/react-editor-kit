import React, { useState, useCallback, CSSProperties, memo } from "react";
import { Element } from "slate";
import { PopupContent } from "./PopupContent";
import { Overlay } from "../../ui/Popup";
import { ReactEditor } from "slate-react";
import { useEditorKit } from "../../editor/EditorKit";
import { getPosition, Location, Offsets } from "./Popups";
import { Portal } from "./Portal";
import { block } from "../../ui/Utils";

export interface ModalPopupProps {
  element: Element;
  children: JSX.Element;
  show: boolean;
  location?: Location;
  offsets?: Offsets;
  onClickOutside?(event?: React.MouseEvent<HTMLElement, MouseEvent>): void;
}

export const ModalPopup = (props: ModalPopupProps) => {
  const { element, children, onClickOutside, show, location, offsets } = props;
  const { editor } = useEditorKit();
  const [domElement, setDomElement] = useState<HTMLElement | null>(null);
  const handleRef = useCallback((element: HTMLElement) => {
    setDomElement(element);
  }, []);

  if (!show) {
    return null;
  }

  let style: CSSProperties = { display: "inline-block" };
  if (domElement) {
    const htmlElement = ReactEditor.toDOMNode(editor, element);
    const anchorBounds = htmlElement.getBoundingClientRect();
    const bounds = domElement.getBoundingClientRect();
    style = getPosition(bounds, anchorBounds, location, true, offsets);
  }
  return (
    <Portal>
      <Overlay onClick={onClickOutside}>
        <PopupContent ref={handleRef} style={style} onMouseDown={block}>
          {children}
        </PopupContent>
      </Overlay>
    </Portal>
  );
};

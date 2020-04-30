import React, {
  useCallback,
  CSSProperties,
  useState,
  Fragment,
  memo,
} from "react";
import { Node } from "slate";
import { ReactEditor } from "slate-react";
import { useEditorKit } from "../../editor/EditorKit";
import { useHover } from "../../editor/Hover";
import { Show } from "../../ui/Show";
import { useFocused } from "../../editor/Focus";
import { Location, getPosition, Offsets } from "./Popups";
import { PopupContent } from "./PopupContent";

export interface HoverPopupProps {
  node?: Node;
  element?: HTMLElement;
  location?: Location;
  children: React.ReactNode;
  fixed?: boolean;
  hideWhenFocusedWithin?: boolean;
  offsets?: Offsets;
}

export const HoverPopup = memo((props: HoverPopupProps) => {
  const { editor } = useEditorKit();
  const {
    node,
    element,
    location,
    fixed,
    hideWhenFocusedWithin,
    children,
    offsets,
  } = props;
  if (!node && !element) {
    return children as JSX.Element;
  }

  const [marker, setMarker] = useState<HTMLElement | null>(null);
  const [popup, setPopup] = useState<HTMLElement | null>(null);

  const over = useHover(marker);
  const { isFocusedWithin } = useFocused(node);

  let style: CSSProperties = { position: "static" };
  let contentStyle: CSSProperties = {};

  if (marker) {
    const htmlElement = element || ReactEditor.toDOMNode(editor, node as Node);
    if (!htmlElement) {
      return null;
    }
    const anchor = htmlElement.getBoundingClientRect();
    const bounds = popup ? popup.getBoundingClientRect() : anchor;
    contentStyle = getPosition(bounds, anchor, location, fixed, offsets);
    style = {
      width: anchor.width,
      top: anchor.top,
      left: anchor.left,
      height: anchor.height,
    };
  }

  const handleMarkerRef = useCallback((ref: HTMLElement | null) => {
    setMarker(ref);
  }, []);

  const showWhenFocused = hideWhenFocusedWithin ? !isFocusedWithin : true;
  const show = over && showWhenFocused;

  return (
    <Fragment>
      <div
        className="rek-floating-marker"
        contentEditable="false"
        ref={handleMarkerRef}
        style={style}
      />
      <Show when={show}>
        <PopupContent style={contentStyle} ref={setPopup}>
          {children}
        </PopupContent>
      </Show>
    </Fragment>
  );
});

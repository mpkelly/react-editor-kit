import React, { useState, useEffect } from "react";
import { useEditorKit } from "../../editor/EditorKit";
import { useFocused } from "../../editor/Focus";
import { CursorPopup } from "../popup/CursorPopup";
import { Location, Offsets } from "../popup/Popups";
import { Range } from "slate";
import { ReactEditor } from "slate-react";

export interface SelectionToolbarProps {
  children: JSX.Element[];
  location?: Location;
  offsets?: Offsets;
  delay?: number;
}

export const SelectionToolbar = (props: SelectionToolbarProps) => {
  const { children, location, offsets, delay } = props;
  const [outside, setOutside] = useState(false);
  const { editor } = useEditorKit();
  const { selection } = editor;
  const { isFocused, isFocusedWithin } = useFocused(editor);
  const focused = isFocused || isFocusedWithin;
  const hide = !focused || !selection || !Range.isExpanded(selection);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const { clientX: x, clientY: y } = event;
      const { left, width, top, height } = ReactEditor.toDOMNode(
        editor,
        editor
      ).getBoundingClientRect();
      const outside =
        x < left || x > left + width || y < top || y > top + height;
      setOutside(outside);
    };
    if (!hide) {
      window.addEventListener("mousemove", handleMove);
    }
    return () => window.removeEventListener("mousemove", handleMove);
  }, [hide]);

  if (hide || outside) {
    return null;
  }

  return (
    <CursorPopup
      location={location || "bottom"}
      offsets={offsets || { v: 50 }}
      expanded
      fixed
      delay={delay || 1000}
    >
      <div className="rek-selection-toolbar">{children}</div>
    </CursorPopup>
  );
};

import React from "react";
import { useEditorKit } from "../../editor/EditorKit";
import { useFocused } from "../../editor/Focus";
import { CursorPopup } from "../popup/CursorPopup";
import { Location, Offsets } from "../popup/Popups";
import { Range } from "slate";

export interface SelectionToolbarProps {
  children: JSX.Element[];
  location?: Location;
  offsets?: Offsets;
  delay?: number;
}

export const SelectionToolbar = (props: SelectionToolbarProps) => {
  const { children, location, offsets, delay } = props;
  const { editor } = useEditorKit();
  const { selection } = editor;
  const { isFocused, isFocusedWithin } = useFocused(editor);
  const focused = isFocused || isFocusedWithin;

  if (!focused || !selection || !Range.isExpanded(selection)) {
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

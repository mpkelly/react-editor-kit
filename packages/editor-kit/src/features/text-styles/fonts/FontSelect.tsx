import React, { useRef } from "react";
import { Range } from "slate";
import { Select, SelectItem } from "../../../ui/Select";
import { useEditorKit } from "../../../editor/EditorKit";
import { ReactEditor } from "slate-react";
import { getPropertyValueAtCursor } from "../../../editor/Editor";
import { useLastFocused } from "../../../editor/LastFocusedNode";

import { clone } from "../../../ui/Utils";

export interface FontSelectProps {
  fonts?: EditorFont[];
}

export const FontSelect = (props: FontSelectProps) => {
  const fonts = props.fonts || DefaultFonts;
  const { editor } = useEditorKit();
  const { node } = useLastFocused(editor);
  const lastSelection = useRef<Range | undefined>();
  const { selection } = editor;
  if (selection) {
    lastSelection.current = clone(selection);
  }
  const handleChange = (item: SelectItem) => {
    editor.addSelectionMark("fontFamily", item.value.fontFamily);
  };
  const items: SelectItem[] = fonts.map((font) => ({
    text: font.name,
    value: font,
    style: { fontFamily: font.fontFamily },
    disabled: !editor.isMarkSupported("fontFamily", node),
  }));

  const { selected, current } = getFonts(editor, items);

  return (
    <Select
      items={items}
      selected={selected}
      onItemSelected={handleChange}
      onFocus={editor.markSelection}
      value={current}
      className="rek-font-select"
    />
  );
};

const getFonts = (editor: ReactEditor, items: SelectItem[]) => {
  let current = getPropertyValueAtCursor("fontFamily", editor);
  let selected = items[0];
  if (current) {
    const currentName = current.replace(/['"]+/g, "");
    const currentItem = items.find((choice) => {
      const choiceName = choice.value.fontFamily.replace(/['"]+/g, "");
      return choiceName === currentName;
    });
    if (currentItem) {
      selected = currentItem;
      current = currentItem.value.name;
    }
  }
  return { selected, current: current ? shortName(current) : undefined };
};

const shortName = (fontFamily: string) => {
  const parts = fontFamily.split(",");
  return parts[0].replace(/['"]+/g, "").trim();
};
export interface EditorFont {
  name: string;
  fontFamily: string;
}

export const DefaultFonts: EditorFont[] = [
  { name: "Sans-serif", fontFamily: "sans-serif" },
  { name: "Serif", fontFamily: "serif" },
  { name: "Monospace", fontFamily: "monospace" },
  { name: "Display", fontFamily: "display" },
  { name: "Arial", fontFamily: "Arial, sans-serif" },
  { name: "Helvetica", fontFamily: "Helvetica, sans-serif" },
  { name: "Times", fontFamily: "Times, serif" },
  { name: "Times New Roman", fontFamily: "'Times New Roman', Times, serif" },
  { name: "Courier", fontFamily: "Courier, monsospace" },
  { name: "Courier New", fontFamily: "'Courier New', monsospace" },
];

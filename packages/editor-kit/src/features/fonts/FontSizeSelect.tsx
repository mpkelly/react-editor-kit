import React, { FunctionComponent } from "react";
import { ReactEditor } from "slate-react";
import { Select, SelectItem } from "../../ui/Select";
import { useEditorKit } from "../../editor/EditorKit";
import { getPropertyValueAtCursor } from "../../editor/Editor";
import { useLastFocused } from "../../editor/LastFocusedNode";
import { TooltipContentProps } from "../popup/Tooltip";

export interface FontSizeSelectProps extends TooltipContentProps {
  fontSizes?: number[];
}

export const FontSizeSelect: FunctionComponent<FontSizeSelectProps> = (
  props: FontSizeSelectProps
) => {
  const { fontSizes, ...rest } = props;
  const { editor } = useEditorKit();
  const { element: node } = useLastFocused(editor);
  const changeValue = (value: number) => {
    editor.addSelectionMark("fontSize", value);
  };

  const handleChoice = (item: SelectItem) => {
    changeValue(item.value);
  };

  const handleChange = (value: string) => {
    changeValue(Number(value));
  };
  const items: SelectItem[] = (fontSizes || []).map((size) => ({
    text: String(size),
    value: size,
    disabled: !editor.isContentAllowed("fontSize", node),
  }));

  const currentSize = getFontSize(editor);
  const selected = items.find((item) => item.value === currentSize);

  return (
    <Select
      items={items}
      selected={selected}
      value={currentSize ? Math.trunc(currentSize) : undefined}
      className="rek-font-size-select"
      onItemSelected={handleChoice}
      onInputChange={handleChange}
      onFocus={editor.markSelection}
      type="number"
      editable
      {...rest}
    />
  );
};

const getFontSize = (editor: ReactEditor) => {
  const size = getPropertyValueAtCursor("fontSize", editor);
  if (size) {
    return parseFloat(size);
  }
  return undefined;
};

export const DefaultFontSizes = [
  8,
  9,
  10,
  11,
  12,
  14,
  16,
  18,
  24,
  36,
  48,
  60,
  72,
];
FontSizeSelect.defaultProps = {
  fontSizes: DefaultFontSizes,
};

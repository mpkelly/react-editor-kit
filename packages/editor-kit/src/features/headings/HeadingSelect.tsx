import React, { Fragment, FunctionComponent } from "react";
import { Transforms, Range } from "slate";
import { Select, SelectItem } from "../../ui/Select";
import { useLastFocused } from "../../editor/LastFocusedNode";
import { useEditorKit } from "../../editor/EditorKit";
import { TooltipContentProps } from "../popup/Tooltip";

export interface HeadingSelectProps extends TooltipContentProps {
  types?: { type: string; name: string }[];
}

export const HeadingSelect: FunctionComponent<HeadingSelectProps> = (
  props: HeadingSelectProps
) => {
  const { types, ...rest } = props;

  const { editor } = useEditorKit();
  const { element: node, selection } = useLastFocused(editor);

  const items: SelectItem[] = (types || []).map((type) => ({
    text: type.name,
    value: type,
    disabled: !editor.isNodeSupported(type.type, node),
  }));

  const handleChange = (item: SelectItem) => {
    if (node && item.value.type !== node.type) {
      Transforms.setNodes(
        editor,
        {
          type: item.value.type,
        },
        {
          at: selection as Range,
          split: Boolean(selection && Range.isExpanded(selection)),
        }
      );
    }
  };

  const selected = node
    ? (items.find((item) => item.value.type === node.type) as SelectItem) ||
      items[0]
    : items[0];

  return (
    <Fragment>
      <Select
        className="rek-heading-select"
        items={items}
        selected={selected}
        onItemSelected={handleChange}
        onFocus={editor.markSelection}
        value={selected.text}
        {...rest}
      />
    </Fragment>
  );
};

export const DefaultTypes = [
  { type: "paragraph", name: "Normal text" },
  { type: "h1", name: "Heading 1" },
  { type: "h2", name: "Heading 2" },
  { type: "h3", name: "Heading 3" },
  { type: "h4", name: "Heading 4" },
  { type: "h5", name: "Heading 5" },
  { type: "h6", name: "Heading 6" },
];

HeadingSelect.defaultProps = {
  types: DefaultTypes,
};

import React, { Fragment, useState, useCallback } from "react";
import { Element, Transforms } from "slate";
import { RenderElementProps, ReactEditor } from "slate-react";
import { DeletableElement } from "../elements/DeletableElement";
import { usePlugin } from "../../plugins/usePlugin";
import { useEditorKit } from "../../editor/EditorKit";
import { LabelsPlugin } from "../i18n/LabelsPlugin";
import { IconProvider } from "../icons/IconProviderPlugin";
import { Icon } from "../icons/Icon";
import { HtmlElementModalPopup } from "../popup/HTMLElementModalPopup";
import { Checkbox } from "../../ui/Checkbox";
import { blockEvent, stopEvent } from "../../ui/Utils";
import { useFocused } from "../../editor/Focus";
import { useTables } from "./Tables";
import { Show } from "../../ui/Show";

export const TableElement = (props: RenderElementProps) => {
  const { attributes, element, children } = props;
  const { icons } = usePlugin<IconProvider>("icon-provider");
  const { addRow, addColumn } = useTables();

  const classes: string[] = ["rek-table"];

  const handleAddRow = useCallback(() => {
    const lastRow = element.children[element.children.length - 1];
    const cell = lastRow.children[0];
    addRow(cell);
  }, [element]);

  const handleAddColumn = useCallback(() => {
    const row = element.children[0];
    const lastCell = row.children[row.children.length - 1];
    addColumn(lastCell);
  }, [element]);

  if (element.headerRow) {
    classes.push("rek-header-row");
  }
  if (element.headerColumn) {
    classes.push("rek-header-column");
  }

  const { isFocusedWithin } = useFocused(element);

  if (element.borderless && !isFocusedWithin) {
    classes.push("rek-borderless");
  }
  return (
    <DeletableElement {...props} toolbarContent={<Toolbar element={element} />}>
      <div className="rek-table-wrapper">
        <div className="rek-table-wrapper-body">
          <table tabIndex={1} className={classes.join(" ")}>
            <tbody {...attributes}>{children}</tbody>
          </table>
          <Show when={isFocusedWithin}>
            <div
              contentEditable={false}
              className="rek-table-right"
              onMouseDown={(event) => blockEvent(event) && handleAddColumn()}
            >
              <Icon icon={icons.plus} />
            </div>
          </Show>
        </div>
        <Show when={isFocusedWithin}>
          <div
            contentEditable={false}
            className="rek-table-bottom"
            onMouseDown={(event) => blockEvent(event) && handleAddRow()}
          >
            <Icon icon={icons.plus} />
          </div>
        </Show>
      </div>
    </DeletableElement>
  );
};

interface ToolbarProps {
  element: Element;
}

const Toolbar = (props: ToolbarProps) => {
  const { element } = props;
  const { icons } = usePlugin<IconProvider>("icon-provider");
  const { labels } = usePlugin<LabelsPlugin>("label-provider");
  const { editor } = useEditorKit();
  const [toolbar, setToolbar] = useState<HTMLElement>();

  const handleChange = (key: string, checked: boolean) => {
    Transforms.setNodes(
      editor,
      { [key]: checked },
      { at: ReactEditor.findPath(editor, element) }
    );
  };

  const handleSettings = (event: React.MouseEvent) => {
    setToolbar(event.currentTarget.parentElement as HTMLElement);
  };

  const hideSettings = () => setToolbar(undefined);

  const handleDelete = () => {
    Transforms.delete(editor, { at: ReactEditor.findPath(editor, element) });
  };
  return (
    <Fragment>
      <div
        className="rek-block-toolbar rek-panel"
        onMouseDown={stopEvent}
        onClick={blockEvent}
      >
        <Icon icon={icons.settings} onClick={handleSettings} />
        <div className="rek-v-toolbar-divider" />
        <Icon icon={icons.delete} onClick={handleDelete} />
      </div>
      <HtmlElementModalPopup
        show={Boolean(toolbar)}
        location="top"
        offsets={{ v: -8 }}
        element={toolbar as HTMLElement}
        onClickOutside={hideSettings}
      >
        <div className="rek-panel rek-table-settings" onClick={blockEvent}>
          <Checkbox
            label={labels.headerRow}
            checked={element.headerRow}
            onChange={(checked) => handleChange("headerRow", checked)}
          />
          <Checkbox
            label={labels.headerColumn}
            checked={element.headerColumn}
            onChange={(checked) => handleChange("headerColumn", checked)}
          />
          <Checkbox
            label={labels.borderless}
            checked={element.borderless}
            onChange={(checked) => handleChange("borderless", checked)}
          />
        </div>
      </HtmlElementModalPopup>
    </Fragment>
  );
};

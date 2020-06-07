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

  let focusedClass = "";

  if (isFocusedWithin) {
    focusedClass = "rek-table-focused";
  }

  return (
    <DeletableElement {...props}>
      <div className={`rek-table-wrapper ${focusedClass}`}>
        <div className="rek-table-wrapper-body">
          <table tabIndex={1} className={classes.join(" ")} id={element.id}>
            <tbody {...attributes}>{children}</tbody>
          </table>
          <div
            contentEditable={false}
            className="rek-table-right"
            onMouseDown={(event) => blockEvent(event) && handleAddColumn()}
          >
            <Icon icon={icons.plus} />
          </div>
        </div>
        <div
          contentEditable={false}
          className="rek-table-bottom"
          onMouseDown={(event) => blockEvent(event) && handleAddRow()}
        >
          <Icon icon={icons.plus} />
        </div>
      </div>
    </DeletableElement>
  );
};

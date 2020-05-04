import React, { Fragment, useState } from "react";
import { RenderElementProps } from "slate-react";
import { getAncestor } from "../../editor/Editor";
import { useEditorKit } from "../../editor/EditorKit";
import { Element } from "slate";
import { Show } from "../../ui/Show";
import { usePlugin } from "../../plugins/usePlugin";
import { IconProvider } from "../icons/IconProviderPlugin";
import { useTables } from "./Tables";
import { HtmlElementModalPopup } from "../popup/HtmlElementModalPopup";
import { ElementToolbar } from "../toolbar/ElementToolbar";
import { MenuItem } from "../menu/MenuItem";
import { Menu } from "../menu/Menu";

export const TableCellElement = (props: RenderElementProps) => {
  const { attributes, children, element, ...rest } = props;
  const { icons } = usePlugin<IconProvider>("icon-provider");
  const { editor } = useEditorKit();
  const { addColumn, addRow, deleteRow, deleteColumn } = useTables();

  const [showRowToolbar, setShowRowToolbar] = useState(false);
  const [columnButton, setColumnButton] = useState<HTMLElement | null>();

  const [showColumnToolbar, setShowColumnToolbar] = useState(false);
  const [rowButton, setRowButton] = useState<HTMLElement | null>();

  const [showTableMenu, setShowTableMenu] = useState(false);
  const [tableButton, seTableButton] = useState<HTMLElement | null>();

  const toggleColumnToolbar = () => {
    setShowColumnToolbar((show) => !show);
  };
  const toggleRowToolbar = () => {
    setShowRowToolbar((show) => !show);
  };

  const toggleTableMenu = () => {
    setShowTableMenu((show) => !show);
  };

  const table = getAncestor(editor, element, 2);
  const row = getAncestor(editor, element, 1);
  const isFirstRow = table?.children.indexOf(row as Element) == 0;
  const isFirstColumn = row?.children.indexOf(element) == 0;
  const isFirstCell = isFirstRow && isFirstColumn;

  return (
    <Fragment>
      <td {...attributes} {...rest} className="rek-td">
        <Show when={isFirstCell}>
          <div
            className="rek-table-button"
            contentEditable={false}
            onClick={toggleTableMenu}
            ref={seTableButton}
          />
        </Show>
        <Show when={isFirstColumn}>
          <div
            className="rek-table-row-button"
            contentEditable={false}
            onClick={toggleRowToolbar}
            ref={setRowButton}
          />
          <div className="rek-table-row-insert" contentEditable={false}>
            <div
              className="rek-table-row-insert-button"
              contentEditable={false}
            >
              <div
                className="rek-table-row-insert-button-inner"
                contentEditable={false}
                onClick={() => addRow(element)}
              >
                {icons.plus}
              </div>
            </div>
            <div
              className="rek-table-row-insert-divider"
              contentEditable={false}
            />
          </div>
        </Show>
        <Show when={isFirstRow}>
          <div
            className="rek-table-column-button"
            contentEditable={false}
            onClick={toggleColumnToolbar}
            ref={setColumnButton}
          />
          <div className="rek-table-column-insert" contentEditable={false}>
            <div
              className="rek-table-column-insert-button"
              contentEditable={false}
            >
              <div
                className="rek-table-column-insert-button-inner"
                contentEditable={false}
                onClick={() => addColumn(element)}
              >
                {icons.plus}
              </div>
            </div>
            <div
              className="rek-table-column-insert-divider"
              contentEditable={false}
            />
          </div>
        </Show>
        {children}
      </td>
      <HtmlElementModalPopup
        show={showRowToolbar}
        element={rowButton as HTMLElement}
        onClickOutside={toggleRowToolbar}
        location="top"
        offsets={{ v: -16 }}
      >
        <ElementToolbar onMouseDown={() => deleteRow(element)}>
          {icons.delete}
        </ElementToolbar>
      </HtmlElementModalPopup>
      <HtmlElementModalPopup
        show={showColumnToolbar}
        element={columnButton as HTMLElement}
        onClickOutside={toggleColumnToolbar}
        location="top"
        offsets={{ v: -16 }}
      >
        <ElementToolbar onMouseDown={() => deleteColumn(element)}>
          {icons.delete}
        </ElementToolbar>
      </HtmlElementModalPopup>
      <HtmlElementModalPopup
        show={showTableMenu}
        element={tableButton as HTMLElement}
        onClickOutside={toggleTableMenu}
        location="auto"
      >
        <Menu>
          <MenuItem icon={icons.checkIcon} text={"Header row"} />
          <MenuItem icon={icons.checkIcon} text={"Header column"} />
          <MenuItem text={"Borderless"} />
        </Menu>
      </HtmlElementModalPopup>
    </Fragment>
  );
};

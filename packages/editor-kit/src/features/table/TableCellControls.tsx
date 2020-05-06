import React, { Fragment, useState, FunctionComponent } from "react";
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
import { Menu } from "../menu/Menu";
import { TablePlugin } from "./TablePlugin";
import { LabelsPlugin } from "../i18n/LabelsPlugin";
import { TableElementMenuItem } from "./TableElementMenuItem";
import { useFocused } from "../../editor/Focus";
import { Icon, EditorIcon } from "../icons/Icon";
import { blockEvent } from "../../ui/Utils";

//TODO tidy this up!
export const TableCellControls = (props: RenderElementProps) => {
  const { element } = props;
  const { icons } = usePlugin<IconProvider>("icon-provider");
  const { tableSettings } = usePlugin<TablePlugin>("table");
  const { labels } = usePlugin<LabelsPlugin>("label-provider");
  const { editor } = useEditorKit();
  const [state, setState] = useState(initialState());

  const { addColumn, addRow, deleteRow, deleteColumn } = useTables();

  const [showTableMenu, setShowTableMenu] = useState(false);
  const toggleTableMenu = () => {
    setShowTableMenu((show) => !show);
  };

  const [tableButton, setTableButton] = useState<HTMLElement | null>();

  const handleDeleteRow = () => {
    deleteRow(element);
  };

  const handleDeleteColumn = () => {
    deleteColumn(element);
  };

  const handleAddRow = () => {
    addRow(element);
  };

  const handleAddColumn = () => {
    addColumn(element);
  };

  const hideToolbar = () => {
    setState(initialState());
  };

  const showToolbar = (event: React.MouseEvent, handler: Function) => {
    setState({ button: event.currentTarget as HTMLElement, handler });
  };

  const table = getAncestor(editor, element, 2);
  const row = getAncestor(editor, element, 1);
  const isFirstRow = table?.children.indexOf(row as Element) == 0;
  const isFirstColumn = row?.children.indexOf(element) == 0;
  const isFirstCell = isFirstRow && isFirstColumn;

  const { isFocusedWithin } = useFocused(table as Element);
  if (!isFocusedWithin) {
    return null;
  }

  return (
    <Fragment>
      <Show when={isFirstCell}>
        <div
          className="rek-table-button"
          contentEditable={false}
          onMouseDown={(event) => blockEvent(event) && toggleTableMenu()}
          ref={setTableButton}
        />
        <TableRowInsert
          icon={icons.plus}
          onClick={() => addRow(element, true)}
          className="rek-start"
        />
        <TableColumnInsert
          icon={icons.plus}
          onClick={() => addColumn(element, true)}
          className="rek-start"
        />
      </Show>
      <Show when={isFirstColumn}>
        <div
          className="rek-table-row-button"
          contentEditable={false}
          onMouseDown={(event) =>
            blockEvent(event) && showToolbar(event, handleDeleteRow)
          }
        />
        <TableRowInsert icon={icons.plus} onClick={handleAddRow} />
      </Show>
      <Show when={isFirstRow}>
        <div
          className="rek-table-column-button"
          contentEditable={false}
          onMouseDown={(event) =>
            blockEvent(event) && showToolbar(event, handleDeleteColumn)
          }
        />
        <TableColumnInsert icon={icons.plus} onClick={handleAddColumn} />
      </Show>

      <HtmlElementModalPopup
        show={Boolean(state.button)}
        element={state.button}
        onClickOutside={hideToolbar}
        location="top"
        offsets={{ v: -16 }}
      >
        <ElementToolbar className="rek-table-cell-toolbar">
          <Icon icon={icons.delete} onMouseDown={state.handler as any} />
        </ElementToolbar>
      </HtmlElementModalPopup>

      <HtmlElementModalPopup
        show={showTableMenu}
        element={tableButton as HTMLElement}
        onClickOutside={toggleTableMenu}
        location="auto"
      >
        <Menu className="rek-table-menu">
          <Show when={tableSettings.allowHeaderRow}>
            <TableElementMenuItem
              text={labels.headerRow}
              property="headerRow"
              table={table as Element}
            />
          </Show>

          <Show when={tableSettings.allowheaderColumn}>
            <TableElementMenuItem
              text={labels.headerColumn}
              property="headerColumn"
              table={table as Element}
            />
          </Show>
          <Show when={tableSettings.allowBorderless}>
            <TableElementMenuItem
              text={labels.borderless}
              property="borderless"
              table={table as Element}
            />
          </Show>
        </Menu>
      </HtmlElementModalPopup>
    </Fragment>
  );
};

const initialState = (): {
  button: HTMLElement | null;
  handler: Function | null;
} => ({ button: null, handler: null });

export interface TableRowInsertProps {
  icon: EditorIcon;
  onClick(): void;
  className?: string;
}

export const TableRowInsert: FunctionComponent<TableRowInsertProps> = (
  props: TableRowInsertProps
) => {
  const { icon, onClick, className } = props;
  return (
    <div
      className={`rek-table-row-insert ${className}`}
      contentEditable={false}
    >
      <div className="rek-table-row-insert-button">
        <div className="rek-table-row-insert-button-inner">
          <Icon icon={icon} onMouseDown={onClick} />
        </div>
      </div>
      <div className="rek-table-row-insert-divider" />
    </div>
  );
};

TableRowInsert.defaultProps = {
  className: "",
};

export interface TableColumnInsertProps {
  icon: EditorIcon;
  onClick(): void;
  className?: string;
}

export const TableColumnInsert: FunctionComponent<TableColumnInsertProps> = (
  props: TableRowInsertProps
) => {
  const { icon, onClick, className } = props;
  return (
    <div
      className={`rek-table-column-insert ${className}`}
      contentEditable={false}
    >
      <div className="rek-table-column-insert-button">
        <div
          className="rek-table-column-insert-button-inner"
          contentEditable={false}
        >
          <Icon icon={icon} onMouseDown={onClick} />
        </div>
      </div>
      <div className="rek-table-column-insert-divider" />
    </div>
  );
};

TableRowInsert.defaultProps = {
  className: "",
};

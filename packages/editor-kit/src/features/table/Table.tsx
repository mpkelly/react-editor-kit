import React, { Fragment, useRef, useState } from "react";
import { Element, Transforms } from "slate";
import { RenderElementProps, ReactEditor } from "slate-react";
import { DeletableBlock } from "../blocks/DeletableBlock";
import { usePlugin } from "../../plugins/usePlugin";
import { useEditorKit } from "../../editor/EditorKit";
import { Labels } from "../i18n/LabelsPlugin";
import { IconProvider } from "../icons/IconProviderPlugin";
import { Icon } from "../icons/Icon";
import { ModalPopup } from "../popup/HTMLElementModalPopup";
import { Checkbox } from "../../ui/Checkbox";
import { block } from "../../ui/Utils";
import { useFocused } from "../../editor/Focus";

export const Table = (props: RenderElementProps) => {
  const { attributes, element, children } = props;
  const classes: string[] = ["rek-table"];

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
    <DeletableBlock {...props} toolbarContent={<Toolbar element={element} />}>
      <table tabIndex={1} className={classes.join(" ")}>
        <tbody {...attributes}>{children}</tbody>
      </table>
    </DeletableBlock>
  );
};

export interface ToolbarProps {
  element: Element;
}

const Toolbar = (props: ToolbarProps) => {
  const { element } = props;
  const { data } = usePlugin("icon-provider") as IconProvider;
  const { data: labels } = usePlugin("labels") as Labels;
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
      <div className="rek-code-block-toolbar rek-panel" onClick={stop}>
        <Icon icon={data.settings} onClick={handleSettings} />
        <div className="rek-v-toolbar-divider" />
        <Icon icon={data.delete} onClick={handleDelete} />
      </div>
      <ModalPopup
        show={Boolean(toolbar)}
        location="top"
        offsets={{ v: -8 }}
        element={toolbar as HTMLElement}
        onClickOutside={hideSettings}
      >
        <div className="rek-panel rek-table-settings" onClick={block}>
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
      </ModalPopup>
    </Fragment>
  );
};

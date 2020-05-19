import { Transforms } from "slate";
import React, { useState, Fragment } from "react";
import { useEditorKit } from "../../editor/EditorKit";
import { LabelsPlugin } from "../i18n/LabelsPlugin";
import { usePlugin } from "../../plugins/usePlugin";
import { useLastFocused } from "../../editor/LastFocusedNode";
import { SaveDialog } from "../../ui/SaveDialog";
import { HtmlElementModalPopup } from "../popup/HtmlElementModalPopup";

import { ActionProps } from "../actions/Action";

export interface CustomLayoutActionProps extends Partial<ActionProps> {}

export const CustomLayoutAction = (props: CustomLayoutActionProps) => {
  const { children } = props;
  const { editor, executeAction } = useEditorKit();
  const { labels } = usePlugin<LabelsPlugin>("label-provider");
  const [show, setShow] = useState(false);
  const { point } = useLastFocused(editor);

  const handleSave = (text: string): void => {
    if (point) {
      Transforms.select(editor, point);
    }
    const layout = text
      .trim()
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => Number(part));

    if (layout.length && !layout.find(isNaN)) {
      executeAction("layout", { layout });
      toggleShow();
    }
  };

  const toggleShow = () => {
    setShow((show) => !show);
  };

  const onMouseDown = (event?: React.MouseEvent) => {
    setTimeout(toggleShow, 1);
  };
  return (
    <Fragment>
      <div onMouseDown={onMouseDown}>{children}</div>
      <HtmlElementModalPopup
        show={show}
        element={document.body}
        onClickOutside={toggleShow}
        location={"center"}
      >
        <SaveDialog
          className={"rek-custom-lyoutdialog"}
          saveButtonText={labels.save}
          placeholderText={labels.customLayout}
          onSave={handleSave}
        />
      </HtmlElementModalPopup>
    </Fragment>
  );
};

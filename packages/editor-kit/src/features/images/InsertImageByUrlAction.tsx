import React, { FunctionComponent, ReactNode, Fragment, useState } from "react";
import { useEditorKit } from "../../editor/EditorKit";
import { Action } from "../actions/Action";
import { blockEvent } from "../../ui/Utils";
import { ImageExtensions } from "./ImageExtensions";
import { insertImage, isImageUrl } from "./ImagePlugin";
import { ModalPopup } from "../popup/HtmlElementModalPopup";
import { Labels } from "../i18n/LabelsPlugin";
import { SaveDialog } from "../../ui/SaveDialog";
import { usePlugin } from "../../plugins/usePlugin";
import { Transforms } from "slate";
import { useLastFocused } from "../../editor/LastFocusedNode";

export interface UploadImageActionProps {
  children: ReactNode;
  extensions?: string[];
}

export const InsertImageByUrlAction: FunctionComponent<UploadImageActionProps> = (
  props: UploadImageActionProps
) => {
  const { children } = props;
  const { editor } = useEditorKit();
  const { data: labels } = usePlugin("labels") as Labels;
  const [show, setShow] = useState(false);
  const { point } = useLastFocused(editor);

  const handleSave = (url: string): void => {
    if (isImageUrl(url)) {
      if (point) {
        Transforms.select(editor, point);
      }
      insertImage(editor, url);
    }
    toggleShow();
  };

  const toggleShow = () => {
    setShow((show) => !show);
  };

  const onMouseDown = (event?: React.MouseEvent) => {
    blockEvent(event as React.MouseEvent);
    toggleShow();
  };
  return (
    <Fragment>
      <Action isActive={() => false} onMouseDown={onMouseDown}>
        {children}
      </Action>
      <ModalPopup
        show={show}
        element={document.body}
        onClickOutside={toggleShow}
        location={"center"}
      >
        <SaveDialog
          className={"rek-image-url-dialog"}
          saveButtonText={labels.save}
          placeholderText={labels.validImageUrl}
          onSave={handleSave}
        />
      </ModalPopup>
    </Fragment>
  );
};

InsertImageByUrlAction.defaultProps = {
  extensions: ImageExtensions,
};

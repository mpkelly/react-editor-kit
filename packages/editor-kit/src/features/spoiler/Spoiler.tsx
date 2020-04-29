import React, { memo, useState, useCallback, Fragment } from "react";
import { RenderElementProps, ReactEditor } from "slate-react";
import { useEditorKit } from "../../editor/EditorKit";
import { Tooltip } from "../popup/Tooltip";
import { Show } from "../../ui/Show";

export const Spoiler = memo((props: RenderElementProps) => {
  const { attributes, element, children } = props;
  const { editor } = useEditorKit();
  const [show, setShow] = useState(false);
  const handleShow = useCallback(() => {
    if (isReadOnly) {
      setShow(true);
    }
  }, []);
  const isReadOnly = ReactEditor.isReadOnly(editor);
  let showClass = "";
  if (isReadOnly) {
    if (show) {
      showClass = "showspoiler";
    } else {
      showClass = "hidespoiler";
    }
  }
  return (
    <Fragment>
      <Show when={isReadOnly && !show}>
        <Tooltip tooltipText={"Click to see spoiler"} node={element} />
      </Show>
      <div
        {...attributes}
        className={`rek-spoiler ${showClass}`}
        onClick={handleShow}
      >
        {children}
      </div>
    </Fragment>
  );
});

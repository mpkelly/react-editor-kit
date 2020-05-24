import React, { Fragment, useState, useEffect } from "react";
import { RenderElementProps, ReactEditor } from "slate-react";
import { Languages } from "./Languages";
import { Select, SelectItem } from "../../ui/Select";
import { useFocused } from "../../editor/Focus";
import { stopEvent } from "../../ui/Utils";
import { Transforms } from "slate";
import { useEditorKit } from "../../editor/EditorKit";
import { Icon } from "../icons/Icon";
import { usePlugin } from "../../plugins/usePlugin";
import { IconProvider } from "../icons/IconProviderPlugin";
import { ElementToolbar } from "../toolbar/ElementToolbar";
import { FocusPopup } from "../popup/FocusPopup";
import { Code } from "./CodePlugin";
import { Show } from "../../ui/Show";

export const CodeElement = (props: RenderElementProps) => {
  const { attributes, element, children } = props;
  const lang = Languages[(element.lang as any) || "JavaScript"];
  const { hideToolbar } = usePlugin<Code>("code");
  const [open, setOpen] = useState(false);
  const { isFocused, isFocusedWithin } = useFocused(element);
  const show = open || isFocused || isFocusedWithin;
  const handleOpen = () => {
    setTimeout(() => setOpen(true), 300);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!isFocusedWithin) {
      setTimeout(handleClose, 1);
    }
  }, [isFocusedWithin]);

  return (
    <Fragment>
      <pre
        className={`rek-code-block ${lang}`}
        spellCheck={false}
        {...attributes}
      >
        <code>{children}</code>
      </pre>
      <Show when={!hideToolbar}>
        <FocusPopup element={element} show={show} location="bottom" fixed>
          <Toolbar {...props} onFocus={handleOpen} onClose={handleClose} />
        </FocusPopup>
      </Show>
    </Fragment>
  );
};

export interface ToolbarProps extends RenderElementProps {
  onFocus(): void;
  onClose(): void;
}

const Toolbar = (props: ToolbarProps) => {
  const { onFocus, onClose, element } = props;
  const { editor } = useEditorKit();
  const { icons } = usePlugin<IconProvider>("icon-provider");
  const selected =
    Items.find((items) => items.text === element.lang) || Items[0];
  const [value, setValue] = useState(selected.text);

  const handleChange = (item: SelectItem) => {
    setValue(item.text);
    Transforms.setNodes(
      editor,
      { ...element, lang: item.text },
      { at: ReactEditor.findPath(editor, element) }
    );
    onClose();
  };
  const handleDelete = () => {
    Transforms.delete(editor, { at: ReactEditor.findPath(editor, element) });
    onClose();
  };

  return (
    <ElementToolbar
      onClick={stopEvent}
      onMouseEnter={onFocus}
      onMouseLeave={onClose}
    >
      <Select
        items={Items}
        selected={selected}
        onItemSelected={handleChange}
        onInputChange={setValue}
        value={value}
        editable
      />
      <div className="rek-v-toolbar-divider" />
      <Icon icon={icons.delete} className="rek-delete" onClick={handleDelete} />
    </ElementToolbar>
  );
};

const Items = Object.entries(Languages).map((entry) => ({
  text: entry[0],
  value: entry[1],
}));

import React, { Fragment, useState } from "react";
import { RenderElementProps, ReactEditor } from "slate-react";
import { Languages } from "./Languages";
import { Select, SelectItem } from "../../ui/Select";
import { ModalPopup } from "../popup/ElementModalPopup";
import { useFocused } from "../../editor/Focus";
import { stop } from "../../ui/Utils";
import { Transforms } from "slate";
import { useEditorKit } from "../../editor/EditorKit";
import { Icon } from "../icons/Icon";
import { usePlugin } from "../../plugins/usePlugin";
import { IconProvider } from "../icons/IconProviderPlugin";

export const CodeBlock = (props: RenderElementProps) => {
  const { attributes, element, children } = props;
  const lang = Languages[(element.lang as any) || "JavaScript"];
  const [showSelect, setShowSelect] = useState(false);
  const { isFocused, isFocusedWithin } = useFocused(element);
  const show = showSelect || isFocused || isFocusedWithin;

  const handleOpen = () => {
    setTimeout(() => setShowSelect(true), 300);
  };

  const handleClose = () => {
    setShowSelect(false);
  };

  return (
    <Fragment>
      <pre
        className={`rek-code-block ${lang}`}
        spellCheck={false}
        {...attributes}
      >
        <code>{children}</code>
      </pre>
      <ModalPopup
        element={element}
        show={show}
        onClickOutside={handleClose}
        location="bottom"
      >
        <Toolbar {...props} onFocus={handleOpen} onClose={handleClose} />
      </ModalPopup>
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
  const { data } = usePlugin("icon-provider") as IconProvider;
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
  };
  const handleDelete = () => {
    Transforms.delete(editor, { at: ReactEditor.findPath(editor, element) });
    onClose();
  };

  return (
    <div
      className="rek-code-block-toolbar rek-panel"
      onClick={stop}
      onMouseEnter={onFocus}
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
      <Icon icon={data.delete} onClick={handleDelete} />
    </div>
  );
};

const Items = Object.entries(Languages).map((entry) => ({
  text: entry[0],
  value: entry[1],
}));

import React, { useCallback } from "react";
import { Transforms, Editor, Node } from "slate";
import { RenderElementProps, ReactEditor } from "slate-react";
import { useEditorKit } from "../../editor/EditorKit";
import { useFocused } from "../../editor/Focus";
import { IconProvider } from "../icons/IconProviderPlugin";
import { usePlugin } from "../../plugins/usePlugin";
import { Checkbox } from "../../ui/Checkbox";
import { IconButton, Show, MenuItem } from "../../Index";
import { stopEvent } from "../../ui/Utils";
import { MenuButton } from "../menu/MenuButton";
import { LabelsPlugin } from "../i18n/LabelsPlugin";

export interface TodoItemElementProps extends RenderElementProps {
  placeholder: string;
  dateFormatter: (date: Date) => string;
}

export const TodoItemElement = (props: TodoItemElementProps) => {
  const { children, attributes, element, placeholder, dateFormatter } = props;
  const { editor } = useEditorKit();

  const { icons } = usePlugin<IconProvider>("icon-provider");
  const { labels } = usePlugin<LabelsPlugin>("labels-provider");

  const handleChange = useCallback(() => {
    Transforms.setNodes(
      editor,
      { complete: !element.complete },
      { at: ReactEditor.findPath(editor, element) }
    );
  }, [element]);
  const { isFocusedWithin } = useFocused(element);
  const focusClass = isFocusedWithin ? "focus" : "";
  const emptyClass = Node.string(element).length ? "" : "rek-empty";

  const handleMove = () => {
    const path = ReactEditor.findPath(editor, element);
    if (path) {
      const to = path.slice();
      to.pop();
      to.push(0);
      Transforms.moveNodes(editor, { at: path, to });
    }
  };

  const handleRemoveDate = () => {
    const path = ReactEditor.findPath(editor, element);
    if (path) {
      Transforms.setNodes(editor, { dueDate: undefined }, { at: path });
    }
  };

  const handleDelete = () => {
    const path = ReactEditor.findPath(editor, element);
    if (path) {
      const parentPath = path.slice();
      parentPath.pop();
      const [parent] = Editor.node(editor, parentPath);
      if (parent.children.length == 1) {
        Transforms.removeNodes(editor, { at: parentPath });
      } else {
        Transforms.removeNodes(editor, { at: path });
      }
    }
  };

  return (
    <div
      className={`rek-todo-item ${focusClass} `}
      data-todo-complete={element.complete}
      {...attributes}
    >
      <div contentEditable="false">
        <Checkbox checked={element.complete} onChange={handleChange} />
      </div>
      <div
        className={`rek-todo-item-content ${emptyClass}`}
        placeholder={placeholder}
      >
        {children}
      </div>
      <div className="rek-todo-item-due-date">
        {element.dueDate && (
          <IconButton
            icon={icons.dateIcon}
            tooltipText={dateFormatter(element.dueDate)}
            tooltipOffsets={{ v: 8 }}
          />
        )}
      </div>
      <div contentEditable="false" onMouseDown={stopEvent}>
        <MenuButton
          icon={icons.moreVertIcon}
          menuClassName="rek-todo-item-menu"
        >
          <Show when={element.dueDate}>
            <MenuItem
              text={labels.removeDueDate}
              icon={icons.dateIcon}
              onClick={handleRemoveDate}
            />
          </Show>
          <MenuItem text={labels.moveToTop} onClick={handleMove} />
          <MenuItem
            text={labels.delete}
            icon={icons.delete}
            onClick={handleDelete}
          />
        </MenuButton>
      </div>
    </div>
  );
};

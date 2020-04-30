import React, { useCallback } from "react";
import { Transforms, Range, Node, Editor, Element } from "slate";
import { ReactEditor, RenderElementProps } from "slate-react";
import { Plugin, Trigger } from "../../plugins/Plugin";
import { MatchResult } from "../../editor/Matching";
import { DeletableBlock } from "../blocks/DeletableBlock";
import { Checkbox } from "../../ui/Checkbox";
import { deleteBackward, getActiveNode } from "../../editor/Editor";
import { useEditorKit } from "../../editor/EditorKit";
import { useFocused } from "../../editor/Focus";
import { isBlockEmpty, isNodeActive } from "../blocks/Blocks";
import { IconProvider } from "../icons/IconProviderPlugin";
import { usePlugin } from "../../plugins/usePlugin";
import { MenuButton } from "../menu/MenuButton";
import { MenuItem } from "../menu/MenuItem";
import { Labels } from "../i18n/LabelsPlugin";
import { Show } from "../../ui/Show";
import { stopEvent } from "../../ui/Utils";
import { IconButton } from "../buttons/IconButton";

export const createTodoListPlugin = (
  placeholder = "Supports @mentions and dates e.g. {36hours} or {2days} ",
  dateFormatter = (date: Date) => date.toLocaleString()
): Plugin => {
  return {
    name: "todo-list",
    editorStyles: () => EditorStyle,
    globalStyles: () => GlobalStyle,
    triggers: [
      {
        pattern: "[ ] ",
      },
      {
        pattern: /\{(\d+)(hours|days)\} /,
        range: "line-before",
        id: "due-date",
      },
    ],
    onTrigger: (
      editor: ReactEditor,
      matches: MatchResult[],
      trigger: Trigger
    ) => {
      if (trigger && trigger.id == "due-date") {
        const node = getActiveNode(editor);
        if (node && node.type === "todo-item") {
          const range = matches[0].range;
          const length = range.focus.offset - range.anchor.offset;
          deleteBackward(editor, length);
          if (matches[0].regexMatch) {
            const amount = Number(matches[0].regexMatch[1]);
            const unit = matches[0].regexMatch[2];
            const dueDate = dateFormatter(createDate(amount, unit as any));
            Transforms.setNodes(editor, { dueDate });
          }
        }
      } else if (editor.isNodeSupported("todo-list")) {
        const range = matches[0].range;
        const length = range.focus.offset - range.anchor.offset;
        deleteBackward(editor, length);
        Transforms.insertNodes(editor, defaultTodoList());
      }
    },
    onKeyDown: (
      event: React.KeyboardEvent<HTMLElement>,
      editor: ReactEditor
    ) => {
      if (isNodeActive(editor, "todo-item")) {
        const { selection } = editor;
        if (!selection) {
          return;
        }
        const node = getActiveNode(editor);
        if (!node) {
          return;
        }
        const path = ReactEditor.findPath(editor, node);

        if (Range.isCollapsed(selection) && event.keyCode === 13) {
          //Enter key

          if (!event.shiftKey) {
            if (isBlockEmpty(editor)) {
              const next = [path[0] + 1];
              Transforms.removeNodes(editor);
              Transforms.insertNodes(
                editor,
                {
                  type: "paragraph",
                  autoFocus: true,
                  children: [{ text: "" }],
                },
                {
                  at: next,
                }
              );
            } else {
              path[path.length - 1]++;
              Transforms.insertNodes(
                editor,
                defaultTodoItem({ autoFocus: true }),
                {
                  at: path,
                }
              );
            }
            event.preventDefault();
            return true;
          }
        }
      }
      return false;
    },
    renderElement: (props: RenderElementProps) => {
      const { element } = props;
      switch (element.type) {
        case "todo-list":
          return <TodoList {...props} />;
        case "todo-item":
          return (
            <TodoItem
              {...props}
              placeholder={placeholder}
              dateFormatter={dateFormatter}
            />
          );

        default:
          return undefined;
      }
    },
  };
};

export const TodoList = (props: RenderElementProps) => {
  const { children, attributes } = props;
  return (
    <DeletableBlock {...props}>
      <div className="rek-todo-list" {...attributes}>
        {children}
      </div>
    </DeletableBlock>
  );
};

export interface TodoItemProps extends RenderElementProps {
  placeholder: string;
  dateFormatter: (date: Date) => string;
}

export const TodoItem = (props: TodoItemProps) => {
  const { children, attributes, element, placeholder, dateFormatter } = props;
  const { editor } = useEditorKit();

  const { data: icons } = usePlugin("icon-provider") as IconProvider;
  const { data: labels } = usePlugin("labels") as Labels;

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

const EditorStyle = `
  .rek-todo-list {
    display:flex;
    flex-direction:column;
  }  

  .rek-todo-item {
    display:flex;
    align-items:center;
    margin: 4px 0;    
    border-radius:3px;
    padding:4px;
      
    .rek-check-container {
      margin-bottom:15px;
      transform:scale(.8);
    }    

    .rek-todo-item-content {
      flex-grow:1;
    }
  }
  .rek-todo-item-content.rek-empty:before {
    content: attr(placeholder);
    position:absolute;
    opacity:0.2;
    display: block; /* For Firefox */
  }

  .rek-todo-item[data-todo-complete=true] {
    text-decoration: line-through;
  }

  .rek-todo-item.focus {
    background-color:var(--gray-light2-color);
  }

  .rek-todo-item-due-date {
    display:flex;
    align-items:center;
    padding:0 8px;
  }

`;

const GlobalStyle = `
.rek-todo-item-menu {
  .rek-menu-item-right  {
    display:none;
  }    
}
`;

const defaultTodoList = () => {
  return {
    type: "todo-list",
    children: [defaultTodoItem()],
  };
};

export const defaultTodoItem = (props = {}) => ({
  type: "todo-item",
  complete: false,
  ...props,
  children: [{ text: "" }],
});

type TimeUnit = "hours" | "days";

const createDate = (amount: number, unit: TimeUnit) => {
  const now = new Date();
  switch (unit) {
    case "hours":
      now.setHours(now.getHours() + amount);
      return now;
    case "days":
      now.setDate(now.getDate() + amount);
      return now;
  }
};

import React, { useCallback } from "react";
import { Transforms, Range } from "slate";
import { ReactEditor, RenderElementProps } from "slate-react";
import { Plugin } from "../../plugins/Plugin";
import { MatchResult } from "../../editor/Matching";
import { DeletableBlock } from "../blocks/DeletableBlock";
import { Checkbox } from "../../ui/Checkbox";
import { deleteBackward, getActiveNode } from "../../editor/Editor";
import { useEditorKit } from "../../editor/EditorKit";
import { useFocused } from "../../editor/Focus";
import { isBlockEmpty, isNodeActive } from "../blocks/Blocks";

export const TodoListPlugin: Plugin = {
  name: "todo-list",
  editorStyles: () => EditorStyle,
  triggers: [
    {
      pattern: "[ ] ",
    },
  ],
  onTrigger: (editor: ReactEditor, matches?: MatchResult[]) => {
    if (editor.isNodeSupported("todo-list") && matches && matches[0]) {
      const range = matches[0].range;
      const length = range.focus.offset - range.anchor.offset;
      deleteBackward(editor, length);
      Transforms.insertNodes(editor, defaultTodoList());
    }
  },
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>, editor: ReactEditor) => {
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
              { type: "paragraph", autoFocus: true, children: [{ text: "" }] },
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
        return <TodoItem {...props} />;

      default:
        return undefined;
    }
  },
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

export const TodoItem = (props: RenderElementProps) => {
  const { children, attributes, element } = props;
  const { editor } = useEditorKit();
  const handleChange = useCallback(() => {
    Transforms.setNodes(
      editor,
      { complete: !element.complete },
      { at: ReactEditor.findPath(editor, element) }
    );
  }, [element]);
  const { isFocusedWithin } = useFocused(element);
  const focusClass = isFocusedWithin ? "focus" : "";
  return (
    <div
      className={`rek-todo-list-item ${focusClass}`}
      data-slate-zero-width="z"
      data-todo-complete={element.complete}
      {...attributes}
    >
      <div contentEditable="false">
        <Checkbox checked={element.complete} onChange={handleChange} />
      </div>
      <div className="rek-todo-item-content">{children}</div>
    </div>
  );
};

const EditorStyle = `
  .rek-todo-list {
    display:flex;
    flex-direction:column;
  }  

  .rek-todo-list-item {
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

  .rek-todo-list-item[data-todo-complete=true] {
    text-decoration: line-through;
  }

  .rek-todo-list-item.focus {
    background-color:var(--gray-light2-color);
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

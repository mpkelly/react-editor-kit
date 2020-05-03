import React from "react";
import { RenderElementProps } from "slate-react";
import { Plugin } from "../../plugins/Plugin";
import { TodoListEditorStyle } from "./TodoListEditorStyle";
import { TodoListGlobalStyle } from "./TodoListGlobalStyle";
import { TodoListElement } from "./TodoListElement";
import { TodoItemElement } from "./TodoItemElement";
import { TodoListEnterKeyHandler } from "./TodoListEnterKeyHandler";
import { TodoListMarkdownTrigger } from "./TodoListMarkdownTrigger";
import { TodoListAction } from "./TodoListAction";
import { TodoListDateTrigger } from "./TodoListDateTrigger";

export const createTodoListPlugin = (
  placeholder = "Supports @mentions and dates e.g. {36hours} or {2days} ",
  dateFormatter = (date: Date) => date.toLocaleString()
): Plugin => {
  return {
    name: "todo-list",
    placeholder,
    dateFormatter,
    triggers: [TodoListMarkdownTrigger, TodoListDateTrigger],
    actions: [TodoListAction],
    onKey: [TodoListEnterKeyHandler],
    renderElement: (props: RenderElementProps) => {
      const { element } = props;
      switch (element.type) {
        case "todo-list":
          return <TodoListElement {...props} />;
        case "todo-item":
          return (
            <TodoItemElement
              {...props}
              placeholder={placeholder}
              dateFormatter={dateFormatter}
            />
          );

        default:
          return undefined;
      }
    },
    editorStyle: TodoListEditorStyle,
    globalStyle: TodoListGlobalStyle,
  };
};

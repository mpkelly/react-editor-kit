import { Transforms } from "slate";
import { PluginAction } from "../../plugins/PluginAction";
import { isElementActive } from "../elements/Elements";

export const TodoListAction: PluginAction = {
  action: ({ editor }) => Transforms.insertNodes(editor, defaultTodoList()),
  isActionActive: ({ editor }) => isElementActive(editor, "todo-item"),
};

export const defaultTodoItem = (props = {}) => ({
  type: "todo-item",
  complete: false,
  ...props,
  children: [{ text: "" }],
});

export const defaultTodoList = () => {
  return {
    type: "todo-list",
    children: [defaultTodoItem()],
  };
};

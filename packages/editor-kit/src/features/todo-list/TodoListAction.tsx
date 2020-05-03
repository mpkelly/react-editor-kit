import { PluginAction } from "../../plugins/PluginAction";
import { Transforms } from "slate";
import { isElementActive } from "../blocks/Elements";

export const defaultTodoItem = (props = {}) => ({
  type: "todo-item",
  complete: false,
  ...props,
  children: [{ text: "" }],
});

export const TodoListAction: PluginAction = {
  action: ({ editor }) => Transforms.insertNodes(editor, defaultTodoList()),
  isActionActive: ({ editor }) => isElementActive(editor, "todo-item"),
};

const defaultTodoList = () => {
  return {
    type: "todo-list",
    children: [defaultTodoItem()],
  };
};

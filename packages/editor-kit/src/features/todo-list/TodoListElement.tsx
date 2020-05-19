import React from "react";
import { RenderElementProps } from "slate-react";

export const TodoListElement = (props: RenderElementProps) => {
  const { children, attributes } = props;
  return (
    <div className="rek-todo-list" {...attributes}>
      {children}
    </div>
  );
};

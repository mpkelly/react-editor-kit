import React from "react";
import { RenderElementProps } from "slate-react";
import { DeletableElement } from "../elements/DeletableElement";

export const TodoListElement = (props: RenderElementProps) => {
  const { children, attributes } = props;
  return (
    <DeletableElement {...props}>
      <div className="rek-todo-list" {...attributes}>
        {children}
      </div>
    </DeletableElement>
  );
};

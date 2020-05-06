import React from "react";
import { RenderElementProps } from "slate-react";
import { ResizableElement } from "../elements/ResizableElement";

export const TodoListElement = (props: RenderElementProps) => {
  const { children, attributes } = props;
  return (
    <ResizableElement {...props}>
      <div className="rek-todo-list" {...attributes}>
        {children}
      </div>
    </ResizableElement>
  );
};

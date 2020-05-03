import React from "react";
import { RenderElementProps } from "slate-react";
import { DeletableBlock } from "../blocks/DeletableBlock";

export const TodoListElement = (props: RenderElementProps) => {
  const { children, attributes } = props;
  return (
    <DeletableBlock {...props}>
      <div className="rek-todo-list" {...attributes}>
        {children}
      </div>
    </DeletableBlock>
  );
};

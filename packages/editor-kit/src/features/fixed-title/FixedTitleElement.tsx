import * as React from "react";
import { Node } from "slate";
import { RenderElementProps } from "slate-react";

export interface FixedTitleElementProps extends RenderElementProps {
  placeholder: string;
}

export const FixedTitleElement = (props: FixedTitleElementProps) => {
  const { element, attributes, children, placeholder } = props;
  const isEmpty = Node.string(element).length === 0;
  let className = "rek-fixed-title";
  if (isEmpty) {
    className = className + " rek-empty";
  }
  return (
    <h1 {...attributes} className={className} placeholder={placeholder}>
      {children}
    </h1>
  );
};

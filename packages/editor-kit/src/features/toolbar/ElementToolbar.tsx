import React, { FunctionComponent } from "react";

export interface ElementToolbarProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export const ElementToolbar: FunctionComponent<ElementToolbarProps> = (
  props: ElementToolbarProps
) => {
  const { className, ...rest } = props;
  return <div className="rek-element-toolbar" {...rest} />;
};

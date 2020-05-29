import React, { FunctionComponent } from "react";
import { useEditorKit } from "../../editor/EditorKit";

export interface ElementToolbarProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export const ElementToolbar: FunctionComponent<ElementToolbarProps> = (
  props: ElementToolbarProps
) => {
  const { className, ...rest } = props;
  const { id } = useEditorKit();
  return <div className={`rek-element-toolbar ${className}`} {...rest} />;
};

ElementToolbar.defaultProps = {
  className: "",
};

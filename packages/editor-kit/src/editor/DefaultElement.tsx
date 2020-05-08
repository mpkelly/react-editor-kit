import React, { memo } from "react";
import { RenderElementProps } from "slate-react";

export const DefaultElement = memo((props: RenderElementProps) => {
  return <p {...props.attributes}>{[props.children]}</p>;
});

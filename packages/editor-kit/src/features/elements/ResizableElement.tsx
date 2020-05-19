import React, { useCallback } from "react";
import { RenderElementProps, ReactEditor } from "slate-react";
import { Transforms } from "slate";
import { useEditorKit } from "../../editor/EditorKit";
import { Resizable } from "../resizable/Resizable";

export interface ResizableElementProps extends RenderElementProps {
  className?: string;
}

export const ResizableElement = (props: ResizableElementProps) => {
  let { children, element, className, attributes } = props;
  className = className || "";
  const { editor } = useEditorKit();

  const handleWidthChange = useCallback(
    (resizedWidth: number) => {
      Transforms.setNodes(
        editor,
        { resizedWidth },
        { at: ReactEditor.findPath(editor, element) }
      );
    },
    [element]
  );

  return (
    <Resizable
      initialWidth={element.resizedWidth || "100%"}
      onChange={handleWidthChange}
      attributes={attributes}
    >
      {children}
    </Resizable>
  );
};

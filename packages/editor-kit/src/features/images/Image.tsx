import React from "react";
import {
  RenderElementProps,
  useSelected,
  useFocused,
  ReactEditor,
} from "slate-react";
import { DeletableBlock } from "../blocks/DeletableBlock";
import { useEditorKit } from "../../editor/EditorKit";
import { Transforms } from "slate";

export interface ImageProps extends RenderElementProps {}

export const Image = (props: RenderElementProps) => {
  const { children, element, attributes, ...rest } = props;
  const { editor } = useEditorKit();
  const handleClick = () => {
    Transforms.select(editor, ReactEditor.findPath(editor, element));
  };
  const selected = useSelected();
  const focused = useFocused();
  const focusedClass = selected && focused ? "rek-focused" : "";

  return (
    <DeletableBlock {...props}>
      <div contentEditable={false} onClick={handleClick} {...rest}>
        <img src={element.url} className={`rek-image ${focusedClass}`} />
      </div>
      {children}
    </DeletableBlock>
  );
};

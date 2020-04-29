import React from "react";
import { Transforms } from "slate";
import { useEditorKit } from "../../editor/EditorKit";
import { Action } from "../actions/Action";
import { isNodeActive } from "../blocks/Blocks";
import { blockEvent } from "../../ui/Utils";

export interface HeadingActionProps {
  heading: string;
  text?: string;
  children?: JSX.Element;
}

export const HeadingAction = (props: HeadingActionProps) => {
  const { heading, text, children } = props;
  const { editor } = useEditorKit();

  const isActive = () => {
    return isNodeActive(editor, heading);
  };

  const onMouseDown = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    blockEvent(event);
    if (!isActive()) {
      Transforms.setNodes(editor, { type: heading, children: [] });
    }
  };

  return (
    <Action isActive={isActive} onMouseDown={onMouseDown}>
      {children || <span>{text || heading.toUpperCase()}</span>}
    </Action>
  );
};

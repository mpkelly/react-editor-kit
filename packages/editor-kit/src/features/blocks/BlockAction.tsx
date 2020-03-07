import React from "react";
import { toggleBlock, isNodeActive } from "./Blocks";
import { useEditorKit } from "../../editor/EditorKit";
import { Action } from "../actions/Action";
import { block } from "../../ui/Utils";

export interface BlockActionProps {
  children: JSX.Element;
  type: string;
}

export const BlockAction = (props: BlockActionProps) => {
  const { type, children } = props;
  const { editor } = useEditorKit();
  const enabled = editor.isNodeSupported();
  const onMouseDown = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    block(event);
    if (enabled || isActive()) {
      toggleBlock(editor, type);
    }
  };

  const isActive = () => isNodeActive(editor, type);
  return (
    <Action isActive={isActive} onMouseDown={onMouseDown} disabled={!enabled}>
      {children}
    </Action>
  );
};

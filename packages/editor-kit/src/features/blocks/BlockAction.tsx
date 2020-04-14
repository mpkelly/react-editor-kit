import React from "react";
import { toggleBlock, isNodeActive } from "./Blocks";
import { useEditorKit } from "../../editor/EditorKit";
import { Action } from "../actions/Action";
import { block } from "../../ui/Utils";
import { useLastFocused } from "../../editor/LastFocusedNode";

export interface BlockActionProps {
  children: JSX.Element;
  type: string;
}

export const BlockAction = (props: BlockActionProps) => {
  const { type, children } = props;
  const { editor } = useEditorKit();
  const isActive = () => isNodeActive(editor, type);
  const { node } = useLastFocused(editor);
  const enabled = editor.isNodeSupported(type, node) || isActive();
  const onMouseDown = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    block(event);
    if (enabled) {
      toggleBlock(editor, type);
    }
  };

  return (
    <Action isActive={isActive} onMouseDown={onMouseDown} disabled={!enabled}>
      {children}
    </Action>
  );
};

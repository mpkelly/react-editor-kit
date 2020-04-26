import React from "react";
import { toggleOrderedList } from "./ListsPlugin";
import { Action } from "../actions/Action";
import { isNodeActive } from "../blocks/Blocks";
import { useEditorKit } from "../../editor/EditorKit";
import { useLastFocused } from "../../editor/LastFocusedNode";

export interface OrderedListActionProps {
  children: React.ReactNode;
}

export const OrderedListAction = (props: OrderedListActionProps) => {
  const { editor } = useEditorKit();
  const isActive = () => isNodeActive(editor, "ordered-list");
  const toggle = () => toggleOrderedList(editor);
  const { node } = useLastFocused(editor);
  const enabled = editor.isNodeSupported("ordered-list", node) || isActive();
  return (
    <Action
      {...props}
      isActive={isActive}
      onMouseDown={toggle}
      disabled={!enabled}
    />
  );
};

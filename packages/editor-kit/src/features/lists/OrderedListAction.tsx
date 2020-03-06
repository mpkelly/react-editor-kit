import React from "react";
import { toggleOrderedList } from "./ListsPlugin";
import { Action } from "../actions/Action";
import { isNodeActive } from "../blocks/Blocks";
import { useEditorKit } from "../../editor/EditorKit";

export interface OrderedListActionProps {
  children: JSX.Element;
}

export const OrderedListAction = (props: OrderedListActionProps) => {
  const { editor } = useEditorKit();
  const isActive = () => isNodeActive(editor, "ordered-list");
  const toggle = () => toggleOrderedList(editor);
  const enabled = editor.isNodeSupported("orderer-list");
  return (
    <Action
      {...props}
      isActive={isActive}
      onMouseDown={toggle}
      disabled={!enabled}
    />
  );
};

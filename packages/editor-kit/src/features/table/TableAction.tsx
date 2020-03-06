import React from "react";
import { useEditorKit } from "../../editor/EditorKit";
import { Action } from "../actions/Action";
import { isNodeActive } from "../blocks/Blocks";
import { usePlugin } from "../../plugins/usePlugin";

export interface TableActionProps {
  children: JSX.Element;
}

export const TableAction = (props: TableActionProps) => {
  const { children } = props;
  const { editor } = useEditorKit();
  const plugin = usePlugin("table");
  const onMouseDown = () => {
    if (plugin && plugin.onTrigger) {
      plugin.onTrigger(editor);
    }
  };
  const isActive = () => isNodeActive(editor, "table");
  const enabled = editor.isNodeSupported("table");
  return (
    <Action isActive={isActive} onMouseDown={onMouseDown} disabled={!enabled}>
      {children}
    </Action>
  );
};

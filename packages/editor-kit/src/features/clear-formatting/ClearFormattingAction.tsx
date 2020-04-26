import React from "react";
import { useEditorKit } from "../../editor/EditorKit";
import { Action } from "../actions/Action";

export interface ClearFormattingActionProps {
  formats?: string[];
  children: React.ReactNode;
}

export const ClearFormattingAction = (props: ClearFormattingActionProps) => {
  const { children } = props;
  const formats = props.formats || DefaultEditorFormats;
  const { editor } = useEditorKit();

  const onMouseDown = () => {
    formats.forEach((mark) => {
      editor.removeMark(mark);
    });
  };
  const active = () => false;
  const enabled = editor.isNodeSupported("clear-formatting");
  return (
    <Action onMouseDown={onMouseDown} isActive={active} disabled={!enabled}>
      {children}
    </Action>
  );
};

export const DefaultEditorFormats = [
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "fontSize",
  "fontColor",
  "backgroundColor",
];

import React from "react";
import { Range, Transforms } from "slate";
import { MarkAction } from "../../marks/MarkAction";
import { useEditorKit } from "../../../editor/EditorKit";
import { toggleMark } from "../../marks/Marks";

export interface InitialLetterActionProps {
  children: JSX.Element;
}

export const InitialLetterAction = (props: InitialLetterActionProps) => {
  const { editor } = useEditorKit();
  const onMouseDown = (event: React.MouseEvent) => {
    const selection = editor.selection;
    if (!selection || Range.isExpanded(selection)) {
      return;
    }
    const { path } = selection.focus;
    const firstCharacter: Range = {
      anchor: { path, offset: 0 },
      focus: { path, offset: 1 },
    };
    Transforms.setSelection(editor, firstCharacter);
    toggleMark(editor, "initialLetter", true);
    event.preventDefault();
  };
  return (
    <MarkAction {...props} onMouseDown={onMouseDown} type="initialLetter" />
  );
};

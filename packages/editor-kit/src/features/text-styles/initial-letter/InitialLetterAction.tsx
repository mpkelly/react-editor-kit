import React from "react";
import { Range, Transforms, Editor, Node } from "slate";
import { MarkAction } from "../../marks/MarkAction";
import { useEditorKit } from "../../../editor/EditorKit";
import { toggleMark } from "../../marks/Marks";
import { ReactEditor } from "slate-react";
import { getActiveNode } from "../../../editor/Editor";

export interface InitialLetterActionProps {
  children: JSX.Element;
}

export const InitialLetterAction = (props: InitialLetterActionProps) => {
  const { editor } = useEditorKit();
  const isActiive = () => isInitialLetterActive(editor);

  const onMouseDown = (event: React.MouseEvent) => {
    const selection = editor.selection;
    if (!selection) {
      return;
    }
    const node = getActiveNode(editor);
    console.log("Node", node);
    if (
      !Boolean(
        node &&
          node.children &&
          node.children.find((text: Node) => text.initialLetter)
      )
    ) {
      const path = selection.focus.path;
      const firstCharacter: Range = {
        anchor: { path, offset: 0 },
        focus: { path, offset: 1 },
      };
      Transforms.setSelection(editor, firstCharacter);
      toggleMark(editor, "initialLetter", true);
      Transforms.collapse(editor, { edge: "end" });
    } else {
      if (node) {
        const child = node.children.find((text: Node) => text.initialLetter);
        if (child) {
          Transforms.setNodes(
            editor,
            { initialLetter: undefined },
            { at: ReactEditor.findPath(editor, child) }
          );
        }
      }
    }

    event.preventDefault();
  };

  return (
    <MarkAction
      {...props}
      isActive={isActiive}
      onMouseDown={onMouseDown}
      type="initialLetter"
    />
  );
};

export const isInitialLetterActive = (editor: ReactEditor) => {
  const node = getActiveNode(editor);
  ReactEditor.focus(editor);
  Transforms.collapse(editor, { edge: "end" });

  return Boolean(
    node &&
      node.children &&
      node.children.find((text: Node) => text.initialLetter)
  );
};

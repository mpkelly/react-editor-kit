import React from "react";
import { BlockAction } from "../blocks/BlockAction";
import { useEditorKit } from "../../editor/EditorKit";

export interface CodeBlockActionProps {
  children: React.ReactNode;
}

export const CodeBlockAction = (props: CodeBlockActionProps) => {
  const { children } = props;
  const { editor } = useEditorKit();
  const onMouseDown = () => {
    editor.insertNode({
      type: "code-block",
      children: [{ text: "" }],
      lang: "JavaScript",
    });
  };
  return (
    <BlockAction type={"code-block"} onMouseDown={onMouseDown}>
      {children}
    </BlockAction>
  );
};

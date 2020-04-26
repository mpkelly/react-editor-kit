import React from "react";
import { Transforms, Editor, Range } from "slate";
import { Action } from "../../actions/Action";
import { useEditorKit } from "../../../editor/EditorKit";
import {
  getSelectionRootNodes,
  getPropertyValueAtCursor,
} from "../../../editor/Editor";
import { block } from "../../../ui/Utils";
import { ReactEditor } from "slate-react";
import { useLastFocused } from "../../../editor/LastFocusedNode";

export interface TextAlignActionProps {
  children: React.ReactNode;
  textAlign: string;
}

export const TextAlignAction = (props: TextAlignActionProps) => {
  const { children, textAlign } = props;
  const { editor } = useEditorKit();
  const { node } = useLastFocused(editor);
  const onMouseDown = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    block(event);
    const { selection } = editor;
    if (selection) {
      const nodes = getSelectionRootNodes(selection, editor);
      nodes.forEach((node) => {
        Transforms.setNodes(
          editor,
          { textAlign },
          { at: ReactEditor.findPath(editor, node) }
        );
      });
    }
  };

  const enabled = editor.isNodeSupported("aligned-block", node);
  const isActive = () => {
    return textAlign === getTextAlign(editor);
  };
  return (
    <Action onMouseDown={onMouseDown} isActive={isActive} disabled={!enabled}>
      {children}
    </Action>
  );
};

const getTextAlign = (editor: ReactEditor) => {
  const textAlign = getPropertyValueAtCursor("textAlign", editor);
  const direction = getPropertyValueAtCursor("direction", editor);
  const isRtl = direction == "rtl";
  if (textAlign) {
    if (textAlign === "start" && isRtl) {
      return "right";
    } else if (textAlign === "start") {
      return "left";
    } else if (textAlign === "end" && isRtl) {
      return "left";
    } else if (textAlign === "end") {
      return "right";
    }
    return textAlign;
  }
  const { selection } = editor;
  if (selection) {
    const [node] = Editor.nodes(editor, {
      match: (node) => node.type === "aligned-block",
    });
    if (node && node[0].textAlign) {
      return node[0].textAlign;
    }
  }

  if (direction === "rtl") {
    return "right";
  } else {
    return "left";
  }
};

import React from "react";
import { Plugin } from "../../plugins/Plugin";
import { RenderElementProps, ReactEditor } from "slate-react";
import { Transforms } from "slate";
import { MatchResult } from "../../editor/Matching";
import { deleteBackward } from "../../editor/Editor";
import { DeletableBlock } from "../blocks/DeletableBlock";

export const DividerPlugin: Plugin = {
  withPlugin: (editor) => {
    const { isVoid } = editor;
    editor.isVoid = (element) => {
      return element.type === "divider" ? true : isVoid(element);
    };
    return editor;
  },
  triggers: [{ pattern: /^\s?-{3,}\s/, range: "block" }],
  onTrigger: (editor: ReactEditor, match: MatchResult[]) => {
    let size = 1;
    if (match[0].regexMatch) {
      const text = match[0].regexMatch[0];
      if (text.trim().length > 3) {
        size = 2;
      }
      deleteBackward(editor, text.length);
    }
    Transforms.insertNodes(editor, {
      type: "divider",
      children: [{ text: "" }],
      size,
    });
  },
  renderElement: (props: RenderElementProps) => {
    if (props.element.type === "divider") {
      return <Divider {...props} />;
    }
  },
  editorStyles: () => EditorStyle,
};

const Divider = (props: RenderElementProps) => {
  const { attributes, element, children } = props;
  const dividerClass = element.size == 2 ? "double" : "single";
  return (
    <DeletableBlock {...props}>
      <div className={`rek-divider-${dividerClass}`} {...attributes}>
        {...children}
      </div>
    </DeletableBlock>
  );
};

const EditorStyle = `
  .rek-divider-single {
    width:100%;
    height:1px;
    border-top:1px solid var(--divider-color);
  }

  .rek-divider-double {
    width:100%;
    height:2px;
    border-top:2px solid var(--divider-color);
  }
`;

import React from "react";
import { Plugin } from "../../plugins/Plugin";
import { ReactEditor, RenderElementProps } from "slate-react";
import { Spoiler } from "./Spoiler";
import { Editor } from "slate";
import { toggleInline } from "../inlines/Inlines";

export const SpoilerPlugin: Plugin = {
  triggers: [{ pattern: ":spoiler", range: "word-before" }],
  withPlugin: (editor: ReactEditor) => {
    const { isInline } = editor;

    editor.isInline = element => {
      return element.type === "spoiler" ? true : isInline(element);
    };
    return editor;
  },
  onTrigger: (editor: ReactEditor) => {
    Editor.deleteBackward(editor, { unit: "word" });
    Editor.deleteBackward(editor, { unit: "character" });
    toggleInline(editor, "spoiler");
  },
  renderElement: (props: RenderElementProps) => {
    if (props.element.type == "spoiler") {
      return <Spoiler {...props} />;
    }
    return undefined;
  },
  editorStyles: () => EditorStyle
};

const EditorStyle = `
  .rek-spoiler {
    background-color: rgba(0,0,0,.95);
    display:inline-block;
    color: white;
  }

  .rek-spoiler.showspoiler {
    background-color: unset;
    color: var(--primary-text-color);
  }

  .rek-spoiler.hidespoiler {
    background-color: rgba(0,0,0,.95);
    color: transparent;
    pointer:cursor;
  }
`;

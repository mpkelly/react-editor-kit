import React from "react";
import { Plugin } from "../../plugins/Plugin";
import { RenderElementProps, ReactEditor } from "slate-react";
import { Transforms, Range } from "slate";
import { Video } from "./Video";
import { MatchResult } from "../../editor/Matching";

export const VideoPlugin: Plugin = {
  name: "video",
  withPlugin: (editor: ReactEditor) => {
    const { isVoid } = editor;
    editor.isVoid = element => {
      return element.type === "video" ? true : isVoid(element);
    };
    return editor;
  },
  triggers: [{ pattern: ":video", range: "word-before" }],
  onTrigger: (editor: ReactEditor, matches?: MatchResult[]) => {
    if (matches) {
      editor.deleteBackward("word");
    }
    Transforms.insertNodes(editor, {
      type: "video",
      url: "",
      children: [{ text: "" }] //Include empty child
    });
  },
  renderElement: (props: RenderElementProps) => {
    if (props.element.type === "video") {
      return <Video {...props} />;
    }
    return undefined;
  },
  globalStyles: () => GlobalStyle,
  editorStyles: () => EditorStyle
};

const GlobalStyle = `
.rek-video-settings {
  padding:8px;
  display:flex;

  input {
    width:240px;
    height:26px;
  }
  .rek-button {
    margin-left:8px;
  }
}
`;

const EditorStyle = `
  .rek-video {
    position:relative;
    margin: 0 auto;
    width:auto !important;
    min-height:120px;
  }
  .rek-video-,toolbar {
    display:flex;
    align-items:center;
    justify-content:center;
    padding:4px;
  }

  .rek-video-toolbar .settings-icon {
    cursor:pointer;
    color: var(--secondary-text-color);
  }
  .rek-video-toolbar .settings-icon path {
    fill: var(--secondary-text-color);
  }
`;

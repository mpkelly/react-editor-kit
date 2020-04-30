import React from "react";
import { Plugin, Trigger } from "../../plugins/Plugin";
import { RenderElementProps, ReactEditor } from "slate-react";
import { Transforms } from "slate";
import { Video } from "./Video";
import { MatchResult } from "../../editor/Matching";
import { deleteBackward } from "../../editor/Editor";

export const VideoPlugin: Plugin = {
  name: "video",
  withPlugin: (editor: ReactEditor) => {
    const { isVoid } = editor;
    editor.isVoid = (element) => {
      return element.type === "video" ? true : isVoid(element);
    };
    return editor;
  },
  triggers: [{ pattern: ":video", range: "word-before" }],
  onTrigger: (
    editor: ReactEditor,
    matches?: MatchResult[],
    trigger?: Trigger
  ) => {
    if (!editor.isNodeSupported("video")) {
      return;
    }
    if (trigger) {
      deleteBackward(editor, (trigger.pattern as string).length);
    }
    Transforms.insertNodes(editor, {
      type: "video",
      url: "",
      children: [{ text: "" }], //Include empty child
    });
  },
  renderElement: (props: RenderElementProps) => {
    if (props.element.type === "video") {
      return <Video {...props} />;
    }
    return undefined;
  },
  globalStyles: () => GlobalStyle,
  editorStyles: () => EditorStyle,
};

const GlobalStyle = `
  .rek-video-settings {
    margin-bottom:16px;
  }
`;

const EditorStyle = `
  .rek-video {
    position:relative;    
    min-height:120px;
  }

  .rek-video.rek-no-url {
    background-color: var(--gray-light2-color);
  }

  .rek-video div {
    margin: 0 auto;
  }

  .rek-video-toolbar {
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
    :hover {
      fill: var(--action-color);
    }
  }
`;

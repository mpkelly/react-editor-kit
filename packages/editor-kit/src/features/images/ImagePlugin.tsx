import React from "react";
import { Plugin } from "../../plugins/Plugin";
import { ReactEditor, RenderElementProps } from "slate-react";
import imageExtensions from "image-extensions";
import isUrl from "is-url";
import { Image } from "./Image";
import { Transforms } from "slate";

export const ImagePlugin: Plugin = {
  withPlugin: (editor: ReactEditor) => {
    const { insertData, isVoid } = editor;
    editor.isVoid = element => {
      return element.type === "image" ? true : isVoid(element);
    };
    editor.insertData = data => {
      const text = data.getData("text/plain");
      const { files } = data;

      if (files && files.length > 0) {
        for (const file of files) {
          const reader = new FileReader();
          const [mime] = file.type.split("/");

          if (mime === "image") {
            reader.addEventListener("load", () => {
              const url = reader.result as string;
              insertImage(editor, url);
            });

            reader.readAsDataURL(file);
          }
        }
      } else if (isImageUrl(text)) {
        insertImage(editor, text);
      } else {
        insertData(data);
      }
      1;
    };
    return editor;
  },
  renderElement: (props: RenderElementProps) => {
    const { element } = props;
    if (element.type === "image") {
      return <Image {...props} />;
    }
  },
  editorStyles: () => EditorStyles
};

export const isImageUrl = (url: string) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop() as string;
  return imageExtensions.includes(ext);
};

const insertImage = (editor: ReactEditor, url: string) => {
  const text = { text: "" };
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};

export const EditorStyles = `
  .rek-image {
    display: block;
    width: 100%;
  }

  .rek-image.focused {
    box-shadow:0 0 0 3px #B4D5FF;
  }
`;

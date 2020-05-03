import React from "react";
import { Plugin } from "../../plugins/Plugin";
import { ReactEditor, RenderElementProps } from "slate-react";
import isUrl from "is-url";
import { ImageElement } from "./ImageElement";
import { Transforms } from "slate";
import { ImageExtensions } from "./ImageExtensions";
import { ImageEditorStyles } from "./ImageEditorStyles";
import { registerVoid } from "../void/VoidElement";
import { InsertImagePluginAction } from "./InsertImagePluginAction";

export const ImagePlugin: Plugin = {
  name: "image",
  withPlugin: (editor: ReactEditor) => {
    const { insertData } = editor;
    editor = registerVoid(editor, "image");
    editor.insertData = (data) => {
      const text = data.getData("text/plain");
      const { files } = data;

      if (files && files.length > 0) {
        for (const file of Array.from(files)) {
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
  actions: [InsertImagePluginAction],
  renderElement: (props: RenderElementProps) => {
    const { element } = props;
    if (element.type === "image") {
      return <ImageElement {...props} />;
    }
  },
  editorStyle: ImageEditorStyles,
};

export const isImageUrl = (url: string, extensions = ImageExtensions) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop() as string;
  return extensions.includes(ext);
};
//TODO This should be removed and the above code should use the PluginAction
const insertImage = (editor: ReactEditor, url: string) => {
  const image = { type: "image", url, children: [{ text: "" }] };
  Transforms.insertNodes(editor, image);
};

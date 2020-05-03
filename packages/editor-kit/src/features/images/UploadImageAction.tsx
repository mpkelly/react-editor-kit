import React, { FunctionComponent, ReactNode, Fragment } from "react";

import { Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { useEditorKit, UploadId } from "../../editor/EditorKit";
import { blockEvent } from "../../ui/Utils";
import { ImageExtensions } from "./ImageExtensions";
import { useLastFocused } from "../../editor/LastFocusedNode";

export interface UploadImageActionProps {
  children: ReactNode;
  extensions?: string[];
}

export const UploadImageAction: FunctionComponent<UploadImageActionProps> = (
  props: UploadImageActionProps
) => {
  const { children } = props;
  const { editor, executeAction } = useEditorKit();
  const { point } = useLastFocused(editor);

  const handleFiles = (files: File[]): void => {
    if (point) {
      Transforms.select(editor, point);
    }
    files.forEach((file) => {
      createSlateImage(file, editor);
    });
  };

  const createSlateImage = (file: File, editor: ReactEditor) => {
    const reader = new FileReader();
    const [mime] = file.type.split("/");

    if (mime === "image") {
      reader.addEventListener("load", () => {
        const url = reader.result as string;
        executeAction("image", { url });
      });
      reader.readAsDataURL(file);
    }
  };
  const { openFileBrowser } = useUpload(handleFiles, props.extensions || []);

  const onMouseDown = (event?: React.MouseEvent) => {
    blockEvent(event as React.MouseEvent);
    openFileBrowser();
  };
  return <div onMouseDown={onMouseDown}>{children}</div>;
};

UploadImageAction.defaultProps = {
  extensions: ImageExtensions,
};

export interface UseUploadValue {
  openFileBrowser(): void;
}

export const useUpload = (
  onFiles: (files: File[]) => void,
  extensions: string[]
): UseUploadValue => {
  const uploadInput = () => {
    return document.getElementById(UploadId) as HTMLInputElement;
  };

  const handleFiles = () => {
    const input = uploadInput();
    const files = Array.from(input.files as FileList);
    input.value = "";
    onFiles(filterFiles(files));
  };

  const openFileBrowser = () => {
    const input = uploadInput();
    input.onchange = handleFiles;
    input.click();
  };

  const filterFiles = (files: File[]) => {
    const images: File[] = [];

    files.forEach((file) => {
      const ext = file.type.split("/")[1];
      if (extensions.includes(ext)) {
        images.push(file);
      }
    });

    return images;
  };

  return { openFileBrowser };
};

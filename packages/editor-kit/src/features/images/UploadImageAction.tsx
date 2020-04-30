import React, { FunctionComponent, ReactNode, Fragment } from "react";
import { ReactEditor } from "slate-react";
import { useEditorKit, UploadId } from "../../editor/EditorKit";
import { Action } from "../actions/Action";
import { blockEvent } from "../../ui/Utils";
import { ImageExtensions } from "./ImageExtensions";
import { insertImage } from "./ImagePlugin";

export interface UploadImageActionProps {
  children: ReactNode;
  extensions?: string[];
}

export const UploadImageAction: FunctionComponent<UploadImageActionProps> = (
  props: UploadImageActionProps
) => {
  const { children } = props;
  const { editor } = useEditorKit();

  const handleFiles = (files: File[]): void => {
    files.forEach((file) => {
      createSlateImage(file, editor);
    });
  };
  const { openFileBrowser } = useUpload(handleFiles, props.extensions || []);

  const onMouseDown = (event?: React.MouseEvent) => {
    blockEvent(event as React.MouseEvent);
    openFileBrowser();
  };
  return (
    <Fragment>
      <Action isActive={() => false} onMouseDown={onMouseDown}>
        {children}
      </Action>
    </Fragment>
  );
};

const createSlateImage = (file: File, editor: ReactEditor) => {
  const reader = new FileReader();
  const [mime] = file.type.split("/");

  if (mime === "image") {
    reader.addEventListener("load", () => {
      const url = reader.result as string;
      insertImage(editor, url);
    });
    reader.readAsDataURL(file);
  }
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

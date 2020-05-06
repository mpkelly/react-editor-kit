import React from "react";
import { MenuButtonProps, MenuButton } from "../menu/MenuButton";
import { useEditorKit } from "../../editor/EditorKit";

export const ImageButton = (props: MenuButtonProps) => {
  const { editor } = useEditorKit();
  const enabled = editor.isContentAllowed("image");
  return <MenuButton {...props} disabled={!enabled} data-image-button />;
};

import React from "react";
import { MenuButtonProps, MenuButton } from "../menu/MenuButton";
import { useEditorKit } from "../../editor/EditorKit";
import { useLastFocused } from "../../editor/LastFocusedNode";

export const ImageButton = (props: MenuButtonProps) => {
  const { editor } = useEditorKit();
  const { node } = useLastFocused(editor);
  const enabled = editor.isNodeSupported("image", node);
  return <MenuButton {...props} disabled={!enabled} data-image-button />;
};

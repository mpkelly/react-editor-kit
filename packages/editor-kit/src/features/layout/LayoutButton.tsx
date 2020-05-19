import React from "react";
import { MenuButtonProps, MenuButton } from "../menu/MenuButton";
import { useEditorKit } from "../../editor/EditorKit";
import { useLastFocused } from "../../editor/LastFocusedNode";

export const LayoutButton = (props: MenuButtonProps) => {
  const { editor } = useEditorKit();
  const { element } = useLastFocused(editor);
  const enabled = editor.isContentAllowed("layout", element);
  return <MenuButton {...props} disabled={!enabled} data-layout-button />;
};

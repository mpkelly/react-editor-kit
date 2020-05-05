import React from "react";
import { MenuItemProps, MenuItem } from "../menu/MenuItem";
import { Element, Transforms } from "slate";
import { useEditorKit } from "../../editor/EditorKit";
import { EditorIcon } from "../icons/Icon";
import { IconProvider } from "../icons/IconProviderPlugin";
import { usePlugin } from "../../plugins/usePlugin";
import { ReactEditor } from "slate-react";

export interface TableElementMenuItemProps extends Partial<MenuItemProps> {
  table: Element;
  property: string;
}

export const TableElementMenuItem = (props: TableElementMenuItemProps) => {
  const { table, property, ...rest } = props;
  const { editor } = useEditorKit();
  const { icons } = usePlugin<IconProvider>("icon-provider");
  const enabled = Boolean(table[property]);
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    Transforms.setNodes(
      editor,
      { [property]: !enabled },
      { at: ReactEditor.findPath(editor, table) }
    );
  };
  let icon: EditorIcon | undefined = undefined;
  if (enabled) {
    icon = icons.check;
  }
  return <MenuItem {...rest} icon={icon} onMouseDown={handleClick} />;
};

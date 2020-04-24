import React from "react";
import { ReactEditor } from "slate-react";
import { MenuItem, Menu } from "../menu/Menu";
import { Overlay } from "../../ui/Popup";

export interface ContextMenuContribution {
  trigger?: ContextMenuTrigger;
  items: MenuItem[];
}

export interface ContextMenuTrigger {
  node?: string;
  mark?: string;
  selectionExpanded?: boolean;
  matched?(editor: ReactEditor): boolean;
}

export interface ContextMenuProps {
  items: MenuItem[];
  x: number;
  y: number;
  onClose(): void;
}

export const ContextMenu = (props: ContextMenuProps) => {
  const { x, y, items, onClose } = props;

  return (
    <Overlay onClick={onClose}>
      <Menu items={items} style={{ left: x, top: y, position: "fixed" }} />
    </Overlay>
  );
};

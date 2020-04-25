import React, { ReactNode } from "react";
import { ReactEditor } from "slate-react";
import { Menu } from "../menu/Menu";
import { Overlay } from "../../ui/Popup";

export interface ContextMenuContribution {
  trigger?: ContextMenuTrigger;
  items: ReactNode[];
}

export interface ContextMenuTrigger {
  node?: string;
  mark?: string;
  selectionExpanded?: boolean;
  matched?(editor: ReactEditor): boolean;
}

export interface ContextMenuProps {
  items: ReactNode[];
  x: number;
  y: number;
  onClose(): void;
}

export const ContextMenu = (props: ContextMenuProps) => {
  const { x, y, items, onClose } = props;

  return (
    <Overlay onClick={onClose}>
      <Menu style={{ left: x, top: y, position: "fixed" }}>{items}</Menu>
    </Overlay>
  );
};

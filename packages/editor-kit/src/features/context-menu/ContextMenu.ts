import { ReactEditor } from "slate-react";
import { MenuItem } from "../menu/Menu";

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

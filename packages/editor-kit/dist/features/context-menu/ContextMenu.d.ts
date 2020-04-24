/// <reference types="react" />
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
export interface ContextMenuProps {
    items: MenuItem[];
    x: number;
    y: number;
    onClose(): void;
}
export declare const ContextMenu: (props: ContextMenuProps) => JSX.Element;

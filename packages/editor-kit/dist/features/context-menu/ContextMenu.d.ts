import { ReactNode } from "react";
import { ReactEditor } from "slate-react";
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
export declare const ContextMenu: (props: ContextMenuProps) => JSX.Element;

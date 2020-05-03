import { ReactNode } from "react";
import { EditorState } from "../../editor/EditorState";
export interface ContextMenuContribution {
    trigger?: ContextMenuTrigger;
    items: ReactNode[];
}
export interface ContextMenuTrigger {
    node?: string;
    mark?: string;
    selectionExpanded?: boolean;
    matched?(editor: EditorState): boolean;
}
export interface ContextMenuProps {
    items: ReactNode[];
    x: number;
    y: number;
    onClose(): void;
}
export declare const ContextMenu: (props: ContextMenuProps) => JSX.Element;

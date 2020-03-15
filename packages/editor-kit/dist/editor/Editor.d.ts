import React, { CSSProperties } from "react";
import { Range, Node } from "slate";
import { ReactEditor } from "slate-react";
export interface EditorProps {
    value: Node[];
    onChange(nodes: Node[]): void;
    autoFocus?: boolean;
    className?: string;
    placeholder?: string;
    style?: CSSProperties;
    role?: string;
    as?: React.ElementType;
}
export declare const Editor: (props: EditorProps) => JSX.Element;
export declare const getNextBlock: (editor: ReactEditor) => import("slate").Element | null;
export declare const getPreviousBlock: (editor: ReactEditor) => import("slate").Element | null;
export declare const isNavigatingInto: (editor: ReactEditor, type: string) => boolean | null;
export declare const isNodeFocused: (editor: ReactEditor, type: string) => boolean;
export declare const isAtStartOfNode: (editor: ReactEditor) => boolean;
export declare const deletePreviousNode: (editor: ReactEditor) => void;
export declare const isOnLastLineOfBlock: (editor: ReactEditor) => boolean;
export declare const getActiveNode: (editor: ReactEditor) => import("slate").Element | null;
export declare const getActiveNodeType: (editor: ReactEditor) => any;
export declare const isInLastBlock: (editor: ReactEditor) => boolean;
export declare const moveToEndOfBlock: (editor: ReactEditor) => void;
export declare const getPropertyValueAtCursor: (propertyName: string, editor: ReactEditor, defaultValue?: any) => any;
export declare const deleteBackward: (editor: ReactEditor, length: number, unit?: "character" | "word" | "line" | "block") => void;
export declare const addMarkAtRange: (editor: ReactEditor, range: Range, type: string, value: any) => void;
export declare const getSelectionRootNodes: (selection: Range, editor: ReactEditor) => Node[];

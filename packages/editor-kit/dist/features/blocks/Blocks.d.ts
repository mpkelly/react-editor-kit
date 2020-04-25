/// <reference types="react" />
import { Editor, Node } from "slate";
import { ReactEditor } from "slate-react";
export declare const toggleBlock: (editor: Editor, type: string) => void;
export declare const isNodeActive: (editor: Editor, type: string) => boolean;
export declare const isBlockEmpty: (editor: Editor) => boolean;
export declare const isDeletingBlockContents: (editor: ReactEditor, block: Node, event: import("react").KeyboardEvent<Element>) => boolean;

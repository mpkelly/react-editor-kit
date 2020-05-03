/// <reference types="react" />
import { Editor, Node } from "slate";
import { ReactEditor } from "slate-react";
export declare const toggleElement: (editor: Editor, type: string) => void;
export declare const isElementActive: (editor: Editor, type: string) => boolean;
export declare const isElementEmpty: (editor: Editor) => boolean;
export declare const isDeletingElementContents: (editor: ReactEditor, block: Node, event: import("react").KeyboardEvent<Element> | KeyboardEvent) => boolean;

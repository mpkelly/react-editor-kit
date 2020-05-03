import { ReactEditor } from "slate-react";
import { Node } from "slate";
export declare const toggleInline: (editor: ReactEditor, type: string) => Node;
/**
 * Tell Slate that an Element is inline
 */
export declare const registerInline: (editor: ReactEditor, type: string) => ReactEditor;

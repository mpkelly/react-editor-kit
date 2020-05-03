import { EditorState } from "../editor/EditorState";
import { Plugin } from "./Plugin";
export declare type KeyHandler = {
    pattern: string;
    handle: (editor: EditorState, event: KeyboardEvent, plugin: Plugin) => boolean;
};

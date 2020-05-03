import { Plugin } from "../../plugins/Plugin";
import { ReactEditor } from "slate-react";
import { Trigger } from "../../plugins/Trigger";
export declare const createListPlugin: (type: string, reactType: string, triggers: Trigger[], editorStyle: string) => Plugin;
export declare const toggleList: (editor: ReactEditor, type: string) => void;

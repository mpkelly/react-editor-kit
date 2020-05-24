import { Range } from "slate";
import { ReactEditor } from "slate-react";
import { PluginAction } from "../../plugins/PluginAction";
export declare const InitialLetterPluginAction: PluginAction;
export declare const isInitialLetterActive: (editor: ReactEditor) => any;
export declare const findInitialLetterRange: (editor: ReactEditor) => Range | null;

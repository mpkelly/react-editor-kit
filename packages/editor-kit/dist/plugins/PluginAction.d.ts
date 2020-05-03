import { EditorState } from "../editor/EditorState";
import { Plugin } from "./Plugin";
export interface PluginActionArgs {
    [key: string]: any;
    name?: string;
}
export declare type PluginAction = {
    name?: string;
    action: (state: EditorState, plugin: Plugin, args?: PluginActionArgs) => void;
    constraints?: Constaints;
    /**
     * Is the PluginAction currently active. For example, if this was
     * a bold formatting action, is the text at the cursor currently bold?
     */
    isActionActive(state: EditorState, plugin: Plugin, args?: PluginActionArgs): boolean;
};
export declare enum ActionState {
    Active = 0,
    Disabled = 1
}
export interface Constaints {
    [actionName: string]: {
        marks?: string[];
        nodes?: string[];
    };
}

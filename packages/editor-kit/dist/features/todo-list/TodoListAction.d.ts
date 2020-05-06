import { PluginAction } from "../../plugins/PluginAction";
export declare const TodoListAction: PluginAction;
export declare const defaultTodoItem: (props?: {}) => {
    children: {
        text: string;
    }[];
    type: string;
    complete: boolean;
};
export declare const defaultTodoList: () => {
    type: string;
    children: {
        children: {
            text: string;
        }[];
        type: string;
        complete: boolean;
    }[];
};

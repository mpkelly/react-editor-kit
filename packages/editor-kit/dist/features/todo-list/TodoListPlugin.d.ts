/// <reference types="react" />
import { RenderElementProps } from "slate-react";
import { Plugin } from "../../plugins/Plugin";
export declare const TodoListPlugin: Plugin;
export declare const TodoList: (props: RenderElementProps) => JSX.Element;
export declare const TodoItem: (props: RenderElementProps) => JSX.Element;
export declare const defaultTodoItem: (props?: {}) => {
    children: {
        text: string;
    }[];
    type: string;
    complete: boolean;
};

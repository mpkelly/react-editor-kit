/// <reference types="react" />
import { RenderElementProps } from "slate-react";
import { Plugin } from "../../plugins/Plugin";
export declare const createTodoListPlugin: (placeholder?: string, dateFormatter?: (date: Date) => string) => Plugin;
export declare const TodoList: (props: RenderElementProps) => JSX.Element;
export interface TodoItemProps extends RenderElementProps {
    placeholder: string;
    dateFormatter: (date: Date) => string;
}
export declare const TodoItem: (props: TodoItemProps) => JSX.Element;
export declare const defaultTodoItem: (props?: {}) => {
    children: {
        text: string;
    }[];
    type: string;
    complete: boolean;
};

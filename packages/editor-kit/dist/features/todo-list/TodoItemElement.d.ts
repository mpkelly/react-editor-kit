/// <reference types="react" />
import { RenderElementProps } from "slate-react";
export interface TodoItemElementProps extends RenderElementProps {
    placeholder: string;
    dateFormatter: (date: Date) => string;
}
export declare const TodoItemElement: (props: TodoItemElementProps) => JSX.Element;

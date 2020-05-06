import { FunctionComponent } from "react";
import { RenderElementProps } from "slate-react";
import { EditorIcon } from "../icons/Icon";
export declare const TableCellControls: (props: RenderElementProps) => JSX.Element;
export interface TableRowInsertProps {
    icon: EditorIcon;
    onClick(): void;
    className?: string;
}
export declare const TableRowInsert: FunctionComponent<TableRowInsertProps>;
export interface TableColumnInsertProps {
    icon: EditorIcon;
    onClick(): void;
    className?: string;
}
export declare const TableColumnInsert: FunctionComponent<TableColumnInsertProps>;

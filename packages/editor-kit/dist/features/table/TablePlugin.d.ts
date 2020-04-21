/// <reference types="react" />
import { Node } from "slate";
import { RenderElementProps } from "slate-react";
import { Plugin } from "../../plugins/Plugin";
export interface TablePluginOptions {
    defaultTable: Node[];
}
export declare const createTablePlugin: (options: TablePluginOptions) => Plugin;
export declare const DefaultTable: {
    type: string;
    headerRow: string;
    children: {
        type: string;
        children: ({
            type: string;
            autoFocus: boolean;
            children: {
                text: string;
            }[];
        } | {
            type: string;
            children: {
                text: string;
            }[];
            autoFocus?: undefined;
        })[];
    }[];
}[];
export declare const TablePlugin: Plugin;
export declare const renderTable: (props: RenderElementProps) => JSX.Element;

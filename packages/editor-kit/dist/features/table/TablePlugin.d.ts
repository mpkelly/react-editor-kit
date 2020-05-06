/// <reference types="react" />
import { Node } from "slate";
import { RenderElementProps } from "slate-react";
import { Plugin } from "../../plugins/Plugin";
export interface TablePluginOptions {
    defaultTable: Node[];
    tableSettings: TableSettings;
}
export interface TableSettings {
    allowHeaderRow: boolean;
    allowheaderColumn: boolean;
    allowBorderless: boolean;
}
export interface TablePlugin extends Plugin, TablePluginOptions {
}
export declare const createTablePlugin: (options: TablePluginOptions) => TablePlugin;
export declare const cell: (props?: any) => any;
export declare const DefaultTable: {
    type: string;
    headerRow: boolean;
    children: {
        type: string;
        children: any[];
    }[];
}[];
export declare const TablePlugin: TablePlugin;
export declare const renderTable: (props: RenderElementProps) => JSX.Element;

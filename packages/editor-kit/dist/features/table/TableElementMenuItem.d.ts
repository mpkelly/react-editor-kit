/// <reference types="react" />
import { MenuItemProps } from "../menu/MenuItem";
import { Element } from "slate";
export interface TableElementMenuItemProps extends Partial<MenuItemProps> {
    table: Element;
    property: string;
}
export declare const TableElementMenuItem: (props: TableElementMenuItemProps) => JSX.Element;

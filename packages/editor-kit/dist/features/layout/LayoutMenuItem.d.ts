/// <reference types="react" />
import { MenuItemProps } from "../menu/MenuItem";
import { LayoutActionProps } from "./LayoutAction";
export interface LayoutMenuItemProps extends Omit<MenuItemProps, "children">, Omit<LayoutActionProps, "children"> {
}
export declare const LayoutMenuItem: (props: LayoutMenuItemProps) => JSX.Element;

/// <reference types="react" />
import { MenuItemProps } from "../menu/MenuItem";
export interface HeadingMenuItemProps extends Partial<MenuItemProps> {
    type: string;
}
export declare const HeadingMenuItem: (props: HeadingMenuItemProps) => JSX.Element;

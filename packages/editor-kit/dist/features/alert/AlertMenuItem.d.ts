/// <reference types="react" />
import { MenuItemProps } from "../menu/MenuItem";
export interface AlertMenuItemProps extends Partial<MenuItemProps> {
    type: string;
}
export declare const AlertMenuItem: (props: AlertMenuItemProps) => JSX.Element;

/// <reference types="react" />
import { MenuItemProps } from "../menu/MenuItem";
export interface MarkMenuItemProps extends MenuItemProps {
    type: string;
    value?: any;
}
export declare const MarkMenuItem: (props: MarkMenuItemProps) => JSX.Element;

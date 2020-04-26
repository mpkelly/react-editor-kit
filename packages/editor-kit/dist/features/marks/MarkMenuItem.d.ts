/// <reference types="react" />
import { MenuItemProps } from "../menu/MenuItem";
export interface MarkMenuItemProps extends MenuItemProps {
    type: string;
    value?: any;
    hideOnIcon?: boolean;
}
export declare const MarkMenuItem: (props: MarkMenuItemProps) => JSX.Element;

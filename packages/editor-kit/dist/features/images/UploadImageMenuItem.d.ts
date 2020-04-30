/// <reference types="react" />
import { MenuItemProps } from "../menu/MenuItem";
import { UploadImageActionProps } from "./UploadImageAction";
export interface UploadImageMenuItemProps extends Omit<UploadImageActionProps, "children">, Omit<MenuItemProps, "children"> {
}
export declare const UploadImageMenuItem: (props: UploadImageMenuItemProps) => JSX.Element;

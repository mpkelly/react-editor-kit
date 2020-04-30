/// <reference types="react" />
import { MenuItemProps } from "../menu/MenuItem";
import { UploadImageActionProps } from "./UploadImageAction";
export interface InsertImageByUrlMenuItemProps extends Omit<UploadImageActionProps, "children">, Omit<MenuItemProps, "children"> {
}
export declare const InsertImageByUrlMenuItem: (props: InsertImageByUrlMenuItemProps) => JSX.Element;

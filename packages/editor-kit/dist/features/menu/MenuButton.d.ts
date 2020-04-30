import { FunctionComponent } from "react";
import { MenuProps } from "./Menu";
import { IconProps } from "../buttons/IconButton";
export interface MenuButtonProps extends IconProps, Omit<MenuProps, "className"> {
    disabled?: boolean;
    menuClassName?: string;
}
export declare const MenuButton: FunctionComponent<MenuButtonProps>;

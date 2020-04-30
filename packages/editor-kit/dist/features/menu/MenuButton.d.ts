/// <reference types="react" />
import { MenuProps } from "./Menu";
import { IconProps } from "../buttons/IconButton";
export interface MenuButtonProps extends IconProps, MenuProps {
}
export declare const MenuButton: (props: MenuButtonProps) => JSX.Element;

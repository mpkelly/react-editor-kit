import React, { CSSProperties, ReactNode } from "react";
export interface MenuProps {
    children: ReactNode;
    style?: CSSProperties;
}
export declare const Menu: React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<unknown>>;

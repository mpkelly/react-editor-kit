import React, { CSSProperties, ReactNode } from "react";
export interface MenuProps {
    children: ReactNode;
    style?: CSSProperties;
    className?: string;
}
export declare const Menu: React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<unknown>>;

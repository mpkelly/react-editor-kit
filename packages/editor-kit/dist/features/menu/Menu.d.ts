import React, { CSSProperties, ReactNode } from "react";
import { ReactEditor } from "slate-react";
import { EditorIcon } from "../icons/Icon";
import { EditorLabels } from "../i18n/LabelsPlugin";
export interface MenuItem {
    icon?: EditorIcon | ReactNode;
    text?: string;
    labelKey?: keyof EditorLabels;
    rightText?: string;
    rightLabelKey?: keyof EditorLabels;
    group?: string;
    items?: MenuItem[];
    onClick(editor: ReactEditor): void;
}
export interface MenuProps {
    items: MenuItem[];
    style?: CSSProperties;
}
export declare const Menu: React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<unknown>>;
export declare const MenuItem: (props: MenuItem) => JSX.Element;

import { ReactNode } from "react";
import { ReactEditor } from "slate-react";
import { EditorIcon } from "../icons/Icon";
import { EditorLabels } from "../i18n/EditorLabels";
export interface MenuItemProps {
    icon?: EditorIcon | ReactNode;
    text?: string;
    labelKey?: keyof EditorLabels;
    rightText?: string;
    rightLabelKey?: keyof EditorLabels;
    group?: string;
    children?: ReactNode;
    onClick?(editor: ReactEditor): void;
    active?: boolean;
    disabled?: boolean;
}
export declare const MenuItem: (props: MenuItemProps) => JSX.Element;

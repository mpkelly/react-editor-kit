import { EditorIcon } from "../icons/Icon";
import { ReactEditor } from "slate-react";
export interface Menu {
    items: MenuItem[];
}
export interface MenuItem {
    icon?: EditorIcon;
    text?: string;
    labelKey?: string;
    group?: string;
    items: MenuItem[];
    onClick(editor: ReactEditor): void;
}

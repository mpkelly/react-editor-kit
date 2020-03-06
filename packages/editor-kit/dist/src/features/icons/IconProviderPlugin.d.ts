import { Plugin } from "../../plugins/Plugin";
import { EditorIcon } from "./Icon";
export interface IconProvider extends Plugin {
    data: Icons;
    name: "icon-provider";
}
export interface Icons {
    delete: EditorIcon;
    link: EditorIcon;
    unlink: EditorIcon;
    openLink: EditorIcon;
    errorAlert: EditorIcon;
    warningAlert: EditorIcon;
    infoAlert: EditorIcon;
    settings: EditorIcon;
    dropdownIcon: EditorIcon;
    moreIcon: EditorIcon;
}
export declare const createIconProviderPlugin: (data: Icons) => IconProvider;
export declare const IconProviderPlugin: IconProvider;

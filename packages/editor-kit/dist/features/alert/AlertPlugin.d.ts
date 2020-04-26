/// <reference types="react" />
import { RenderElementProps } from "slate-react";
import { Plugin } from "../../plugins/Plugin";
import { Icons } from "../icons/IconProviderPlugin";
export interface AlertProps extends RenderElementProps {
    iconName: keyof Icons;
}
export declare const Alert: (props: AlertProps) => JSX.Element;
export declare const createAlertPlugin: (iconName: "link" | "delete" | "unlink" | "openLink" | "errorAlert" | "warningAlert" | "infoAlert" | "settings" | "dropdownIcon" | "moreIcon" | "checkIcon", alertName: string, iconColor: string, backgroundColor: string, triggerName: string) => Plugin;

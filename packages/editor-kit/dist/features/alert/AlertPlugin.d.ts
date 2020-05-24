import { Plugin } from "../../plugins/Plugin";
import { PluginAction } from "../../plugins/PluginAction";
import { Icons } from "../icons/Icons";
export declare const AlertActions: PluginAction[];
export declare const createAlertPlugin: (icon: keyof Icons, name: string, iconColor: string, backgroundColor: string, trigger: string) => Plugin;

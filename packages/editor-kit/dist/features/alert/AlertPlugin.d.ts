import { Plugin } from "../../plugins/Plugin";
import { PluginAction } from "../../plugins/PluginAction";
export declare const AlertActions: PluginAction[];
export declare const createAlertPlugin: (icon: "link" | "delete" | "error" | "unlink" | "openLink" | "warning" | "info" | "settings" | "dropdownIcon" | "moreIcon" | "moreVertIcon" | "checkIcon" | "dateIcon" | "plusIcon", name: string, iconColor: string, backgroundColor: string, trigger: string) => Plugin;

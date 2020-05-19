import { Plugin } from "../../plugins/Plugin";
import { PluginAction } from "../../plugins/PluginAction";
export declare const AlertActions: PluginAction[];
export declare const createAlertPlugin: (icon: "link" | "error" | "date" | "delete" | "unlink" | "openLink" | "warning" | "info" | "settings" | "dropdown" | "more" | "moreVert" | "check" | "plus", name: string, iconColor: string, backgroundColor: string, trigger: string) => Plugin;

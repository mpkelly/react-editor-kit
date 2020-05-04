import { Plugin } from "../../plugins/Plugin";
import { PluginAction } from "../../plugins/PluginAction";
export declare const AlertActions: PluginAction[];
export declare const createAlertPlugin: (icon: "link" | "date" | "delete" | "error" | "unlink" | "openLink" | "warning" | "info" | "settings" | "dropdown" | "more" | "moreVert" | "checkIcon" | "plus", name: string, iconColor: string, backgroundColor: string, trigger: string) => Plugin;

import { Plugin } from "../../plugins/Plugin";
import { Trigger } from "../../plugins/Trigger";
export declare const createHeadingPlugin: (type: string, triggers?: Trigger[]) => Plugin;
export declare const createDefaultHeadingPlugin: (type: string, patterns: string[]) => Plugin;

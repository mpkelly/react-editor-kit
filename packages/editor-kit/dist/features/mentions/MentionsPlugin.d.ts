import { Mention } from "./Mention";
import { Trigger } from "../../plugins/Trigger";
export interface StaticMentionOptions {
    mentions: Mention[];
    triggers?: Trigger[];
}
export declare const DefaultTriggers: Trigger[];
export declare const createStaticMentions: (options: StaticMentionOptions) => import("../../Index").Plugin;

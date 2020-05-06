import { Trigger } from "../../plugins/Trigger";

export const MentionsTrigger: Trigger = {
  pattern: /@(\w+)$/,
  range: "line-before",
  clear: false,
};

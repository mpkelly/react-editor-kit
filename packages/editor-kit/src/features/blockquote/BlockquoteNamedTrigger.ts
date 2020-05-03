import { Trigger } from "../../plugins/Trigger";

export const BlockquoteNamedTrigger: Trigger = {
  pattern: `:quote`,
  range: "line-before",
};

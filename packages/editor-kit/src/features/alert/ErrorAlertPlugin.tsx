import { createAlertPlugin } from "./AlertPlugin";

export const ErrorAlertPlugin = createAlertPlugin(
  "error",
  "error-alert",
  "red",
  "#ffc5c4",
  "error"
);

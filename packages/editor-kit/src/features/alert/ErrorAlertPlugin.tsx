import { createAlertPlugin } from "./AlertPlugin";

export const ErrorAlertPlugin = createAlertPlugin(
  "errorAlert",
  "error-alert",
  "red",
  "#ffc5c4",
  "error"
);

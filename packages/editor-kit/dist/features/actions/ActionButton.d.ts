import { FunctionComponent } from "react";
import { IconProps } from "../buttons/IconButton";
import { TooltipContentProps } from "../popup/Tooltip";
import { ActionProps } from "./Action";
export interface ActionButtonProps extends IconProps, Omit<ActionProps, "children">, TooltipContentProps {
}
export declare const ActionButton: FunctionComponent<ActionButtonProps>;

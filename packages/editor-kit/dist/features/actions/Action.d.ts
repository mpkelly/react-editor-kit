import React, { MouseEvent as ReactMouseEvent } from "react";
import { PluginActionArgs } from "../../plugins/PluginAction";
export interface ActionProps {
    children: React.ReactNode;
    /**
     * The name of the plugin which contain the PluginAction to call
     */
    plugin: string;
    /**
     * Any argugments to pass to the Action - mostly empty.
     */
    args?: PluginActionArgs;
    action?: string;
}
/**
 * The child is cloned and passed these props. TypeScript users
 * should extend this interface as part of their props type
 * for custom components that will be wrapped by Actions.
 */
export interface ActionChildProps {
    active?: boolean;
    onMouseDown?(event: ReactMouseEvent<HTMLElement, MouseEvent>): void;
    disabled?: boolean;
}
export declare const Action: (props: ActionProps) => JSX.Element;

import React, { Fragment, MouseEvent as ReactMouseEvent } from "react";
import { PluginActionArgs } from "../../plugins/PluginAction";
import { useEditorKit } from "../../editor/EditorKit";

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

  //Typically not required as most Plugins only have a single PluginAction
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

export const Action = (props: ActionProps) => {
  const { children, plugin, action, args } = props;
  const { executeAction } = useEditorKit();

  const buttonProps: ActionChildProps = {
    onMouseDown: (event: ReactMouseEvent<HTMLElement, MouseEvent>) => {
      // if (!disabled) {
      executeAction(plugin, args, action);
      // }
    },
    active: false,
    disabled: false,
  };

  let element: JSX.Element | null = null;
  if (typeof children == "string") {
    element = <span>{children}</span>;
  } else {
    element = children as JSX.Element;
  }

  const childWithProps = React.cloneElement(element, {
    ...element.props,
    ...buttonProps,
  });

  return <Fragment>{childWithProps}</Fragment>;
};

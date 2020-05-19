import React, { Fragment, MouseEvent as ReactMouseEvent } from "react";
import { PluginActionArgs } from "../../plugins/PluginAction";
import { useEditorKit } from "../../editor/EditorKit";
import { useLastFocused } from "../../editor/LastFocusedNode";
import { Transforms } from "slate";

export interface ActionProps {
  children: React.ReactNode;

  /**
   * The name of the plugin which contain the PluginAction to call
   */
  plugin?: string;

  /**
   * Any argugments to pass to the Action - mostly empty.
   */
  args?: PluginActionArgs;

  //Typically not required as most Plugins only have a single PluginAction
  action?: string;

  /**
   * If no plugin is specfied, a mousedown handler can be set instead
   */
  onMouseDown?(event: ReactMouseEvent<HTMLElement, MouseEvent>): void;
  active?: boolean;
  disabled?: boolean;
}

/**
 * The child is cloned and passed these props. TypeScript users
 * should extend this interface as part of their props type
 * for custom components that will be wrapped by Actions.
 */
export interface ActionChildProps {
  active?: boolean;
  disabled?: boolean;
  onMouseDown?(event: ReactMouseEvent<HTMLElement, MouseEvent>): void;
}

export const Action = (props: ActionProps) => {
  const {
    children,
    plugin,
    action,
    args,
    onMouseDown,
    active,
    disabled,
  } = props;
  const { editor, executeAction, isActionActive } = useEditorKit();
  const { element: lastElement, point } = useLastFocused(editor);
  const enabled = editor.isContentAllowed(plugin, lastElement);
  let buttonProps: ActionChildProps | null = null;

  if (plugin) {
    buttonProps = {
      onMouseDown: (event: ReactMouseEvent<HTMLElement, MouseEvent>) => {
        event.preventDefault();
        if (point) {
          Transforms.select(editor, point);
        }
        if (enabled) {
          executeAction(plugin, args, action);
        }
      },
      active: isActionActive(plugin, args, name),
      disabled: !enabled,
    };
  } else {
    buttonProps = { onMouseDown, active, disabled };
  }

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

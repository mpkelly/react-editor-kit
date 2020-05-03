import React, { FunctionComponent } from "react";
import { IconProps, IconButton } from "../buttons/IconButton";
import { TooltipContentProps } from "../popup/Tooltip";
import { Action, ActionProps } from "./Action";

export interface ActionButtonProps
  extends IconProps,
    Omit<ActionProps, "children">,
    TooltipContentProps {}

export const ActionButton: FunctionComponent<ActionButtonProps> = (
  props: ActionButtonProps
) => {
  const { plugin, action, args, ligature, className, ...rest } = props;
  return (
    <Action plugin={plugin} action={action} args={args}>
      <IconButton
        className={className}
        ligature={ligature}
        data-action-button={`${plugin}${action}`}
        {...rest}
      />
    </Action>
  );
};

ActionButton.defaultProps = {
  action: "",
};

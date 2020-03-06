import React, { Fragment, MouseEvent as ReactMouseEvent } from "react";

export interface ActionProps {
  children: JSX.Element;
  onMouseDown(event?: ReactMouseEvent<HTMLElement, MouseEvent>): void;
  isActive(): boolean;
  disabled?: boolean;
}

export interface ActionChildProps {
  active?: boolean;
  onMouseDown?(event: ReactMouseEvent<HTMLElement, MouseEvent>): void;
  disabled?: boolean;
}

export const Action = (props: ActionProps) => {
  const { children, onMouseDown, isActive, disabled } = props;

  const buttonProps: ActionChildProps = {
    onMouseDown: (event: ReactMouseEvent<HTMLElement, MouseEvent>) => {
      if (!disabled) {
        onMouseDown(event);
      }
    },
    active: isActive(),
    disabled
  };
  const childWithProps = React.cloneElement(children, {
    ...children.props,
    ...buttonProps
  });

  return <Fragment>{childWithProps}</Fragment>;
};

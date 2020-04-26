import React, { Fragment, MouseEvent as ReactMouseEvent } from "react";

export interface ActionProps {
  children: React.ReactNode;
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
    disabled,
  };
  if (!children || typeof children == "string") {
    throw Error("Actions require a JSX.Element or JSX.Element[]");
  }
  const element = children as JSX.Element;
  const childWithProps = React.cloneElement(element, {
    ...element.props,
    ...buttonProps,
  });

  return <Fragment>{childWithProps}</Fragment>;
};

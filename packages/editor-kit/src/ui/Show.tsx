import React, { Fragment } from "react";

export interface ShowProps {
  when: boolean | undefined | null;
  children: JSX.Element | JSX.Element[];
}

export const Show = (props: ShowProps) => {
  const { when, children } = props;
  if (!Boolean(when)) {
    return null;
  }
  return <Fragment>{children}</Fragment>;
};

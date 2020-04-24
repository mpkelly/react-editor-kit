import React, { Fragment, ReactNode } from "react";

export interface ShowProps {
  when: any | undefined | null;
  children: ReactNode;
}

export const Show = (props: ShowProps) => {
  const { when, children } = props;
  if (!Boolean(when)) {
    return null;
  }
  return <Fragment>{children}</Fragment>;
};

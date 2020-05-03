import React, { FunctionComponent } from "react";
import { Action } from "../actions/Action";

export interface HeadingToggleActionProps {
  children: React.ReactNode;
  heading?: string;
}

export const HeadingToggleAction: FunctionComponent<HeadingToggleActionProps> = (
  props: HeadingToggleActionProps
) => {
  let { children, heading } = props;
  return (
    <Action plugin="heading-toggle" args={{ heading }}>
      {children}
    </Action>
  );
};

HeadingToggleAction.defaultProps = {
  heading: "h1",
};

import React from "react";
import { Fragment } from "react";
import styled from "styled-components";
import { Styles as Head } from "./Styles";
import { Theme } from "./Theme";

export interface WebsiteProps {
  children: JSX.Element | JSX.Element[];
}

export const Website = (props: WebsiteProps) => {
  const { children } = props;
  return (
    <Fragment>
      <Head />
      <Body>{children}</Body>
    </Fragment>
  );
};

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Theme.primaryColor};
`;

import React, { Fragment } from "react";
import styled from "styled-components";
import { BoldText } from "../../ui/Text";

export const Nav = () => {
  return (
    <NavContent className="dark-text">
      <BoldText className="upper">Editor Kit</BoldText>
      <NavItems>
        <a href="#plugins">Plugins</a>
        <a href="#faq">FAQ</a>
        <a href="https://github.com/mpkelly/react-editor-kit/tree/master/packages/examples/src">
          Examples
        </a>
      </NavItems>
      <a id="forkme" href="https://github.com/mpkelly/react-editor-kit">
        <img
          width="149"
          height="149"
          src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149"
          className="attachment-full size-full"
          alt="Fork me on GitHub"
          data-recalc-dims="1"
        />
      </a>
    </NavContent>
  );
};

export const NavContent = styled.nav`
  display: flex;
  align-items: center;
  width: 1000px;
  margin: 0 auto;
  padding: 16px;
  #forkme {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export const NavItems = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  a {
    text-decoration: none;
    color: inherit;
    margin-left: 24px;
  }
`;

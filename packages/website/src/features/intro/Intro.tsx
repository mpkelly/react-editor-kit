import React from "react";
import styled from "styled-components";
import { Section } from "../../ui/Section";
import { Theme } from "../../ui/Theme";
import { IntroEditor } from "./IntroEditor";
import { XLargeText, Text, BoldText } from "../../ui/Text";
import { ReactLogo } from "../../ui/ReactLogo";
import { GitHubLogo } from "../../ui/GitHubLogo";
import { Wave } from "../../ui/Wave";
import { TypeScriptLogo } from "../../ui/TypeScriptLogo";
import { JavaScriptLogo } from "../../ui/JavaScriptLogo";

export const Intro = () => {
  return (
    <IntroSection>
      <XLargeText className="dark-text center" id="intro-main-text">
        Compose a powerful text editor from a suite of standard plugins
      </XLargeText>
      <Text className="secondary-light-text center" id="intro-sub-text">
        Editor Kit includes plugins for many standard editor features. Easily
        create anything from a simple comment box to a full-blown word-processor
        like Google Docs.
      </Text>
      <Logos>
        <GitHubLogo />
        <BoldText>SlateJS</BoldText>
        <ReactLogo />
        <JavaScriptLogo />
        <TypeScriptLogo />
      </Logos>
      <Wave />
      <IntroEditor />
    </IntroSection>
  );
};

const IntroSection = styled(Section)`
  width: 100%;
  min-height: 100vh;
  position: relative;
  align-items: center;

  #intro-main-text {
    margin-top: 50px;
  }

  #intro-editor {
    z-index: 2;
  }

  #react-logo {
    width: 100px;
    height: 100px;
  }

  .javascript-logo,
  .typescript-logo,
  .github-logo {
    width: 60px;
    height: 60px;
    margin-right: 16px;
  }

  .javascript-logo {
    rect {
      fill: ${Theme.backgroundColor};
    }
    path {
      fill: ${Theme.primaryColor};
    }
  }

  .typescript-logo,
  .wave1,
  .react-logo,
  .github-logo {
    path {
      fill: ${Theme.backgroundColor};
    }
  }

  .wave1 {
    z-index: 0;
    width: 100vw;
    height: 400px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const Logos = styled.div`
  display: flex;
  align-items: center;
`;

import React from "react";
import styled from "styled-components";
import { Section } from "../../ui/Section";
import { Theme } from "../../ui/Theme";
import { FaqBlock, FaqBlockContent } from "./FaqBlock";
import { Blob } from "../../ui/Blob";
import { XLargeText } from "../../ui/Text";

export const Faq = () => {
  return (
    <FaqSection>
      <Blob />
      <XLargeText className="light-text center" id="faq">
        FAQ
      </XLargeText>
      <FaqBlock
        title={"How is it different from Slate?"}
        description={
          "Slate is a fantastic library but it's still quite low-level and leaves many common and sometimes tricky problems for the developer to solve. React Editor Kit allows you to quickly compose the editor you want with a minimum amount of coding. "
        }
      />
      <FaqBlock
        title={"Why are there no editors?"}
        description={
          <span>
            The project is a kit based on a small core and a suite of plugins.
            As such there are no concrete editors in the package but you can
            easily define one using one of the{" "}
            <a href="https://github.com/mpkelly/react-editor-kit/tree/master/packages/examples/src">
              examples
            </a>
            . The project goal is to provide a comprehensive set of plugins and
            controls that can be used by others to compose the editor they
            require.
          </span>
        }
        align="right"
      />
      <FaqBlock
        title={"Can I use SVG icons or my own custom buttons?"}
        description={
          <span>
            Yes. React Editor Kit provides Actions for common operations, such
            as making some text bold. These Actions are flexible and can accept
            most React components as children. However, if you're usign an icon
            font then there are also ready made Buttons that just require CSS
            class names as shown{" "}
            <a href="https://github.com/mpkelly/react-editor-kit#buttons-and-other-controls">
              here
            </a>
            .
          </span>
        }
      />
      <FaqBlock
        title={"Can React Editor Kit be extended?"}
        description={
          "Apart from a small core, the rest of the functionality is implemented as plugins and you can keep extending the it in the same way. If you add a new plugin that might be usable by others then please consider contributing it to the project. You will of course receive full credit."
        }
        align="right"
      />
      <FaqBlock
        title={"What is the state of development?"}
        description={
          "The project is in alpha. It's usable and supports a lot of common features found in rich-text editors but has some rough edges and might contain a few bugs. There might be some changes but nothing major and there's certainly many more plugins to follow. "
        }
      />
    </FaqSection>
  );
};

const FaqSection = styled(Section)`
  width: 100%;
  min-height: 100vh;
  position: relative;
  align-items: center;
  background-color: ${Theme.backgroundColor};

  h1,
  ${FaqBlockContent} {
    z-index: 1;
  }

  .blob1 {
    position: absolute;
    margin: auto;
    transform: scale(2);
    z-index: 1;
    path {
      fill: #1c1b21;
    }
  }
`;

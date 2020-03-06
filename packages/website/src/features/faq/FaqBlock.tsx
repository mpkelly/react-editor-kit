import React from "react";
import styled from "styled-components";
import { LargeText, Text } from "../../ui/Text";
import { Theme } from "../../ui/Theme";

export interface FaqBlockProps {
  title: string;
  description: string | JSX.Element;
  align?: string;
}

export const FaqBlock = (props: FaqBlockProps) => {
  const { title, description, align } = props;
  return (
    <FaqBlockContent align={align}>
      <LargeText className="light-text">{title}</LargeText>
      <Text className="secondary-light-text">{description}</Text>
    </FaqBlockContent>
  );
};

const getStyles = (props: { align: string | undefined }) => {
  if (props.align == "right") {
    return "margin-left:auto; text-align:right";
  }
  return "";
};

export const FaqBlockContent = styled.div<{ align: string | undefined }>`
  display: flex;
  flex-direction: column;
  width: 1000px;
  margin-bottom: 64px;
  h2,
  p {
    ${getStyles}
  }
  h2 {
    margin-bottom: 0;
  }
  p {
    max-width: 650px;
  }
  a {
    color: inherit;
    text-decoration: none;
    border-bottom: 2px solid ${Theme.primaryColor};
    cursor: pointer;
  }
`;

import styled from "styled-components";
import { Theme } from "./Theme";

const Texts = `
  max-width:750px;
  line-height:1.4;
`;
export const XLargeText = styled.h1`
  ${Texts}
  font-size: ${Theme.fontSizes.xl};
`;

export const LargeText = styled.h2`
  ${Texts}
  font-size: ${Theme.fontSizes.lg};
`;

export const Text = styled.p`
  ${Texts}
  font-size: ${Theme.fontSizes.md};
`;

export const BoldText = styled.span`
  font-size: ${Theme.fontSizes.md};
  font-weight: bold;
`;

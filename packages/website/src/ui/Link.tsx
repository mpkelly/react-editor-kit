import styled from "styled-components";
import { Theme } from "./Theme";

export const Link = styled.a`
  color: inherit;
  text-decoration: none;
  border-bottom: 2px solid ${Theme.primaryColor};
  cursor: pointer;
`;

import { createGlobalStyle } from "styled-components";
import { Theme } from "./Theme";

export const Styles = createGlobalStyle`
  :root {
    --site-primary-color:#e8c415;
    --site-background-color:#1E1E25;
    --site-secondary-text-color:#6b6b6b;
    --site-light-text-color:rgba(255,255,255,.9);
  }
  html,
  body {
    padding: 0;
    margin: 0;
    height: 100vh;
    width: 100vw;
    font-family:sans-serif;
  }

  #app {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction:column;
  }

  * {
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }  

  .center {
    text-align:center;
  }

  .dark-text {
    color:${Theme.backgroundColor};
  }

  .light-text {
    color:${Theme.lightTextColor};
  }

  .secondary-light-text {
    color:${Theme.secondaryTextLightColor};
  }

  .upper {
    text-transform:uppercase;
    letter-spacing:1.4;
  }

`;

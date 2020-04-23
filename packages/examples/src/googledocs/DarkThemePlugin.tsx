import { Plugin } from "@mpkelly/react-editor-kit";

export const DarkThemePlugin: Plugin = {
  globalStyles: () => `  
  
     #root {
      background-color: #151515
     }

    :root {
      --tooltip-background-color: var(--primary-text-color);
      --tooltip-text-color: #151515;
      --control-hover-color: rgba(255,255,255,.1);
      --content-background: #2f2f2f;
      --primary-text-color: rgba(255,255,255, .95);
      --secondary-text-color: rgba(255,255,255, .54);
      --gray-light-color:rgba(0,0,0,.2);
      --gray-light2-color:rgba(0,0,0,.1);
      --divider-color: var(--gray-light-color);
      --input-background-color:var(--gray-light2-color);
      --action-color: #ff00c8;
      --button-color: white;
      --danger-color: red;
      --focus-color: var(--action-color);
      --selection-color: #E3E3E3;
      --editor-ui-font:sans-serif;
    }

    .rek-icon-button {
      color: var(--secondary-text-color);      
      border-radius: 3px;
      :hover,
      .active:not(.rek-disabled) {
        color: var(--primary-text-color);
        background-color:var(--action-color) !important;
      }      
    }

    .rek-svg-icon path {
      fill:var(--secondary-text-color); 
    }
    
    .rek-editor-toolbar-wrapper {
      background-color: #151515;
    }

    .rek-floating-content .rek-editor-toolbar-wrapper {
      background-color:var(--content-background);
    }
  `,
};

import { Plugin } from "../../plugins/Plugin";

export const SelectionToolbarPlugin: Plugin = {
  globalStyles: () => GlobalStyle
};

const GlobalStyle = `
  .rek-selection-toolbar {
    border-radius: 4px;
    padding: 4px;
    display: flex;
    align-items: center;
    background-color: #1f2025;
    
    .rek-icon {
      color: white;
    }

    .rek-icon-button.active:not(.rek-disabled) {
      background-color:white;
      color: #1f2025;
      .rek-icon {
        color: #1f2025;
      }      
    }
  }
`;

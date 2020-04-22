import { Plugin } from "../../plugins/Plugin";

export const EditorToolbarPlugin: Plugin = {
  globalStyles: () => GlobalStyle,
};

const GlobalStyle = `

  .rek-editor-toolbar-wrapper {
    display: flex;
    align-items: center;
    flex-shrink:0;
    width:100%;
    background-color: var(--content-background);
    overflow:hidden;

    * {
      flex-shrink:0;
      box-sizing: border-box;
    }    
  }

  .rek-editor-toolbar-wrapper.rek-no-overflow {
    .more-icon {
      display:none;
    }
  }

  .rek-editor-toolbar-overflow {
    cursor:pointer;
  }

  .rek-editor-toolbar {
    display: flex;    
    align-items: center;
    justify-content:center;
    border-radius: 3px;
    padding: 4px;    
    flex-grow:1;

    .rek-icon-button {
      min-width:36px;  
      width:36px; 
      flex-shrink:0;
    }
    
    .rek-v-toolbar-divider:last-child,
    .rek-v-toolbar-divider:first-child {
      display:none;
    }    
  }  

  .rek-floating-content {
    .rek-editor-toolbar-wrapper {
      flex-grow:0;
    }
    .rek-editor-toolbar {
      flex-grow:0;      
    }
  }
  
  
`;

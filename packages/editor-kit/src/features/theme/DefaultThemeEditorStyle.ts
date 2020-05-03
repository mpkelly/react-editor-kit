import { FocusedLayer } from "../../ui/Layers";

export const DefaultThemeEditorStyle = `  
  font-family: var(--editor-ui-font);
  color: var(--primary-text-color);
  box-sizing: border-box;

  * {
    line-height:1.4;
    box-sizing: border-box;
  }

  .rek-block-wrapper {
    display:flex;
    flex-direction:column;
    align-items:center;    
    position:relative;
    border: 2px solid rgba(0,0,0,0);  
    
    .rek-toolbar {
      position:absolute;
      bottom:-40px;
      .rek-svg-icon {
        fill:var(--secondary-text-color);        
        &:hover {
          fill:var(--action-color);     
        }
      }
    }
  }
  .rek-block-toolbar {
    display:flex;
    align-items:center;
    padding:4px;
  }

  .rek-block-wrapper:not(.inline) .rek-block-wrapper-content {
    width:100%;
  }

  .rek-block-wrapper-content {
    outline:none;    
    &:focus {
      outline:none;
    }
  }

  .rek-block-wrapper.inline {
    display:inline-flex;
  }

  .rek-block-wrapper.rek-focused {
    z-index: ${FocusedLayer};
    border: 2px solid var(--focus-color);
  }
        
  .rek-block-wrapper.deletable .rek-delete-icon {
    cursor: pointer;
    z-index: ${FocusedLayer};
  }

  .rek-block-wrapper.deletable .rek-delete-icon path {
    fill: var(--secondary-text-color);           
  }

  .rek-block-wrapper.deletable .rek-delete-icon:hover path {
    fill: var(--danger-color);      
  }

  .rek-icon {
    cursor:pointer;
  }

  .rek-delete-icon.rek-svg-icon path {
    fill: var(--danger-color);      
  }    

`;

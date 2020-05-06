import { FocusedLayer } from "../../ui/Layers";

export const DefaultThemeEditorStyle = `  
  font-family: var(--editor-ui-font);
  color: var(--primary-text-color);
  box-sizing: border-box;

  p
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  code,
  pre
  {
    line-height:1.4;
    box-sizing: border-box;
  }

  .rek-element-wrapper {
    display:flex;
    flex-direction:column;
    align-items:center;    
    position:relative;
    border: 2px solid rgba(0,0,0,0);  
    
    .rek-toolbar {
      position:absolute;
      bottom:-40px;
      svg.rek-icon {
        fill:var(--secondary-text-color);        
        &:hover {
          fill:var(--action-color);     
        }
      }
    }
  }
  .rek-element-toolbar {
    display:flex;
    align-items:center;
  }

  .rek-element-wrapper:not(.inline) .rek-element-wrapper-content {
    width:100%;
  }

  .rek-element-wrapper-content {
    outline:none;    
    &:focus {
      outline:none;
    }
  }

  .rek-element-wrapper.inline {
    display:inline-flex;
  }

  .rek-element-wrapper.rek-focused {
    z-index: ${FocusedLayer};
    border: 2px solid var(--focus-color);
  }
        
  .rek-element-wrapper.deletable .rek-delete-icon {
    cursor: pointer;
    z-index: ${FocusedLayer};
  }

  .rek-element-wrapper.deletable .rek-delete-icon path {
    fill: var(--secondary-text-color);           
  }

  .rek-element-wrapper.deletable .rek-delete-icon:hover path {
    fill: var(--danger-color);      
  }

  .rek-icon {
    cursor:pointer;
  }

  .rek-delete-icon.rek-svg-icon path {
    fill: var(--danger-color);      
  }    

`;

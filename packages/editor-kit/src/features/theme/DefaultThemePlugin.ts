import { Plugin } from "../../plugins/Plugin";
import {
  FocusedLayer,
  PopupMarkerLayer,
  PopupContentLayer
} from "../../ui/Layers";

export const DefaultThemePlugin: Plugin = {
  editorStyles: () => EditorStyle,
  globalStyles: () => GlobalStyle
};

const GlobalStyle = `
:root {
  --tooltip-background-color: var(--primary-text-color);
  --tooltip-text-color: white;
  --control-hover-color: rgba(0,0,0,.1);
  --content-background: white;
  --primary-text-color: rgba(0,0,0, .75);
  --secondary-text-color: rgba(0,0,0, .54);
  --divider-color: rgba(0,0,0,.2);  
  --input-background-color:rgba(0,0,0,.1);  
  --action-color: mediumseagreen;
  --button-color: white;
  --danger-color: red;
  --focus-color: #5cc3ff;
  --selection-color: #E3E3E3;
  --editor-ui-font:sans-serif;
}

.rek-floating-marker {
  position:fixed;    
  z-index:${PopupMarkerLayer};
}

.rek-floating-content{
  position:fixed;    
  z-index:${PopupContentLayer};
}

.rek-editor-tooltip {
  border-radius:6px;
  padding:2px 8px;
  font-sie:14px;
  background-color: var(--primary-text-color);rek-block-wrapper
}

.rek-editor-tooltip span {
  color: var(--tooltip-text-color) !important;
  font-size:smaller;
}  

.rek-panel {
  background-color: var(--content-background);
  color: var(--primary-text-color);
  font-family: var(--editor-ui-font);  
  box-shadow: 0 2px 2px 1px rgba(0,0,0,.1);
}

.rek-list {        
  display:flex;
  flex-direction:column;
  list-style-type: none;    
}

.rek-list-item {
  padding: 0 8px;
  display: flex;
  align-items: center;
  width:100%;
  height: 36px;
  cursor: pointer;      
  flex-shrink:0;
}

.rek-list-item.active:not(.rek-disabled),
.rek-list-item:hover:not(.rek-disabled) {
  background-color: var(--control-hover-color);
}  

.rek-select {
  position:relative;      
  display:flex;
  align-items:center;  
  border-radius:3px;
  border: 2px solid rgba(0,0,0,0);
}

.rek-select input {
  cursor:pointer;
  width:100%;
}

.rek-select:hover:not(.rek-disabled) {
  background-color: var(--control-hover-color);
}

.rek-select.focus:not(.rek-disabled) {
  border: 2px solid var(--focus-color);
}

.rek-select .rek-icon.dropdown-icon {
  position:absolute;  
  right:0px;
  top:4px;
  transform:scale(.7);
}

.rek-select-list {
  width:100%;
  overflow-y:auto;
  z-index:${PopupContentLayer};
}

.rek-heading-select {
  position:relative;  
  width:140px;
}

.rek-heading-select .rek-select-list {
  max-height:400px;  
  margin-top:24px;   
}

.rek-heading-select input {
  border: none;
  background-color:rgba(0,0,0,0);
}

.rek-select-list::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}    
.rek-select-list::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0);
}

.rek-select-list::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.rek-input {
  padding: 6px;
  color: var(--primary-text-color);
  background-color:var(--input-background-color);
  border:none;
  outline:none;
  font-size:inherit;
}

.rek-input:focus {
  box-shadow: 0 0 0 2px var(--focus-color);
  outline:none;
  border:none;
}

.rek-input::placeholder {
  color: var(--secondary-text-color);
}

.rek-v-toolbar-divider {
  height:24px;
  width:1px;
  margin-left:4px;
  margin-right:4px;
  background-color:var(--input-background-color);
}

.rek-button {
  border:none;
  outline:none;
  background-color:var(--action-color);
  color:var(--button-color);
  text-transform:uppercase;
  padding:4px;
  border-radius:3px;      
}

.rek-button:focus {
  outline:none;
  opacity:.9;
}
.rek-button:hover {
  opacity:.8;
}

.rek-css-icon {
  font-size:24px;
}

.rek-icon-button {
  display:inline-flex !important;
  align-items:center;
  justify-content:center;
  height:36px;
  width:36px;
  cursor:pointer;
}

.rek-icon-button:hover:not(.rek-disabled),
.rek-icon-button.active:not(.rek-disabled) {
  background-color: var(--control-hover-color);
}
.rek-disabled {
  opacity:.5;
  cursor:not-allowed;
  pointer-events:none;
}

.rek-text {
  color:inherit;
  font-size:inherit;    
}

.rek-text.rek-primary {
  color:var(--primary-text-color);
}
.rek-text.rek-secondary {
  color:var(--secondary-text-color);
}
.rek-text.small {
  font-size:smaller;
}

input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance:textfield;
}

.rek-spinner {
  display: inline-block;
  width: 36px;
  height: 36px;
  border: 3px solid var(--divider-color);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}
  
@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}

`;

const EditorStyle = `  
  font-family: var(--editor-ui-font);
  color: var(--primary-text-color);

  * {
    line-height:1.4;
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
    }
  }

  .rek-block-wrapper:not(.inline) > :first-child {
    width:100%;
  }

  .rek-block-wrapper.inline {
    display:inline-flex;
  }

  .rek-block-wrapper.focused {
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

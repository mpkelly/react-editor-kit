import { PopupContentLayer } from "../../ui/Layers";

export const LinkGlobalStyle = `
  .rek-link-toolbar {
    display:flex;
    align-items:center;
    margin-top:16px;
  }

  .rek-link-toolbar span {
    white-space: nowrap;
    color: var(--secondary-text-color);
    cursor:pointer;    
  }

  .rek-link-toolbar > * {
    margin:2px;
  }

  .rek-link-editor {    
    display:flex;
    flex-direction:column;
    z-index: ${PopupContentLayer};
    padding:4px 0;
    margin-top:16px;
    background-color:var(--content-background);    
  }

  .rek-link-editor input {
    margin:4px 8px;      
    padding:4px;
    width:240px;
  }
`;

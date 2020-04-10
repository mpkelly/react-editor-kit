import React from "react";
import { Plugin } from "../../plugins/Plugin";
import { RenderElementProps, ReactEditor } from "slate-react";
import { PopupContentLayer } from "../../ui/Layers";
import { LinkToolbarProps } from "./LinkToolbar";
import { LinkEditorProps } from "./LinkEditor";
import { Link } from "./Link";

export interface Links extends Plugin {
  renderLinkToolbar?(props: LinkToolbarProps): JSX.Element;
  renderLinkEditor?(props: LinkEditorProps): JSX.Element;
}

export const LinkPlugin: Links = {
  name: "links",
  renderElement: (props: RenderElementProps) => {
    const { element } = props;
    if (element.type === "link") {
      return <Link {...props} />;
    }
    return undefined;
  },
  withPlugin: (editor: ReactEditor) => {
    const { isInline } = editor;

    editor.isInline = (element) => {
      return element.type === "link" ? true : isInline(element);
    };
    return editor;
  },
  globalStyles: () => GlobalStyle,
};

const GlobalStyle = `
  .rek-link-toolbar  {
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

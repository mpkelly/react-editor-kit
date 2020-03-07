/// <reference types="react" />
import { Plugin } from "../../plugins/Plugin";
import { LinkToolbarProps } from "./LinkToolbar";
import { LinkEditorProps } from "./LinkEditor";
export interface Links extends Plugin {
    renderLinkToolbar?(props: LinkToolbarProps): JSX.Element;
    renderLinkEditor?(props: LinkEditorProps): JSX.Element;
}
export declare const LinkPlugin: Links;

import React from "react";
import { Element } from "slate";
export interface LinkToolbarProps {
    onEditLink(): any;
    element: Element;
}
export declare const LinkToolbar: (props: LinkToolbarProps) => JSX.Element;
export declare const useLinkToolbar: (props: LinkToolbarProps) => {
    element: Element;
    onEditLink: () => any;
    handleRemoveLink: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    handleOpenLink: () => void;
};

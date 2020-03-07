import React from "react";
export interface LinkEditorProps {
    link: LinkModel;
    onLinkChange(link: LinkModel): void;
}
export interface LinkModel {
    url: string;
    displayName: string;
}
export declare const LinkEditor: (props: LinkEditorProps) => JSX.Element;
export declare const useLinkEditor: (props: LinkEditorProps) => {
    link: LinkModel;
    handleUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDisplayNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

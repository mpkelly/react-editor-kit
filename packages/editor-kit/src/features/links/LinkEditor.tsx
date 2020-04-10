import React, { useCallback } from "react";
import { stop } from "../../ui/Utils";
import { Labels } from "../i18n/LabelsPlugin";
import { usePlugin } from "../../plugins/usePlugin";

export interface LinkEditorProps {
  link: LinkModel;
  onLinkChange(link: LinkModel): void;
}

export interface LinkModel {
  url: string;
  displayName: string;
}

export const LinkEditor = (props: LinkEditorProps) => {
  const { data: labels } = usePlugin("labels") as Labels;
  const { handleUrlChange, handleDisplayNameChange, link } = useLinkEditor(
    props
  );
  return (
    <div className="rek-link-editor rek-panel" onClick={stop} onKeyDown={stop}>
      <input
        type="text"
        className="rek-input"
        placeholder={labels.enterUrl}
        value={link.url}
        autoFocus
        onMouseDown={stop}
        onChange={handleUrlChange}
      />
      <input
        type="text"
        className="rek-input"
        placeholder={labels.enterDisplayText}
        value={link.displayName}
        onMouseDown={stop}
        onChange={handleDisplayNameChange}
      />
    </div>
  );
};

export const useLinkEditor = (props: LinkEditorProps) => {
  const { link, onLinkChange } = props;

  const handleUrlChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const url = event.currentTarget.value;
      onLinkChange({ ...link, url });
    },
    [link]
  );
  const handleDisplayNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const displayName = event.currentTarget.value;
      onLinkChange({ ...link, displayName });
    },
    [link]
  );
  return { link, handleUrlChange, handleDisplayNameChange };
};

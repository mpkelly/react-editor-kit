import React from "react";
import { ReactEditor } from "slate-react";
import { IconProvider } from "../icons/IconProviderPlugin";
import { Icon } from "../icons/Icon";
import { usePlugin } from "../../plugins/usePlugin";
import { useEditorKit } from "../../editor/EditorKit";
import { Transforms, Element } from "slate";
import { Labels } from "../i18n/LabelsPlugin";

export interface LinkToolbarProps {
  onEditLink(): any;
  element: Element;
}

export const LinkToolbar = (props: LinkToolbarProps) => {
  const { onEditLink, handleRemoveLink, handleOpenLink } = useLinkToolbar(
    props
  );
  const { data } = usePlugin("icon-provider") as IconProvider;
  const { data: labels } = usePlugin("labels") as Labels;

  return (
    <div className="rek-link-toolbar rek-panel">
      <span className="rek-text rek-primary" onClick={onEditLink}>
        {labels.editLink}
      </span>
      <Icon icon={data.unlink} onClick={handleRemoveLink} />
      <Icon icon={data.openLink} onClick={handleOpenLink} />
    </div>
  );
};

export const useLinkToolbar = (props: LinkToolbarProps) => {
  const { element, onEditLink } = props;
  const { editor } = useEditorKit();

  const handleRemoveLink = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.stopPropagation();
    const path = ReactEditor.findPath(editor, element);
    Transforms.unwrapNodes(editor, { at: path });
  };
  const handleOpenLink = () => {
    window.open(element.url, "_blank");
  };

  return { element, onEditLink, handleRemoveLink, handleOpenLink };
};

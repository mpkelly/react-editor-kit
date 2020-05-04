import React from "react";
import { Transforms, Element } from "slate";
import { ReactEditor } from "slate-react";
import { IconProvider } from "../icons/IconProviderPlugin";
import { Icon } from "../icons/Icon";
import { usePlugin } from "../../plugins/usePlugin";
import { useEditorKit } from "../../editor/EditorKit";
import { LabelsPlugin } from "../i18n/LabelsPlugin";

export interface LinkToolbarProps {
  onEditLink(): any;
  element: Element;
}

export const LinkToolbar = (props: LinkToolbarProps) => {
  const { onEditLink, handleRemoveLink, handleOpenLink } = useLinkToolbar(
    props
  );
  const { icons } = usePlugin<IconProvider>("icon-provider");
  const { labels } = usePlugin<LabelsPlugin>("label-provider");

  return (
    <div className="rek-link-toolbar rek-panel">
      <span className="rek-text rek-primary" onClick={onEditLink}>
        {labels.editLink}
      </span>
      <Icon icon={icons.unlink} onClick={handleRemoveLink} />
      <Icon icon={icons.openLink} onClick={handleOpenLink} />
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

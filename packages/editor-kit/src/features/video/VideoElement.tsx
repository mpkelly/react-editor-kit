import React, { useState, useCallback, memo } from "react";
import { RenderElementProps, ReactEditor } from "slate-react";
import ReactPlayer from "react-player";
import { DeletableElement } from "../elements/DeletableElement";
import { usePlugin } from "../../plugins/usePlugin";
import { Icon } from "../icons/Icon";
import { ModalPopup } from "../popup/ElementModalPopup";
import { useEditorKit } from "../../editor/EditorKit";
import { IconProvider } from "../icons/IconProviderPlugin";
import { Transforms } from "slate";
import { LabelsPlugin } from "../i18n/LabelsPlugin";
import { SaveDialog } from "../../ui/SaveDialog";

export const VideoElement = memo((props: RenderElementProps) => {
  const { attributes, element, children } = props;
  const { editor } = useEditorKit();
  const { icons } = usePlugin<IconProvider>("icon-provider");
  const [showSettings, setShowSettings] = useState(!Boolean(element.url));

  const handleHideSettings = useCallback(() => {
    setShowSettings(false);
  }, []);
  const handleShowSettings = useCallback(() => {
    setShowSettings(true);
  }, []);
  const handleDelete = useCallback(() => {
    Transforms.delete(editor, { at: ReactEditor.findPath(editor, element) });
  }, []);

  const urlClass = element.url ? "" : "rek-no-url";

  return (
    <DeletableElement
      {...props}
      toolbarContent={
        <div className="rek-video-toolbar" data-slate-zero-width="z">
          <Icon icon={icons.settings} onClick={handleShowSettings} />
          <div className="rek-v-toolbar-divider" />
          <Icon
            icon={icons.delete}
            className="rek-delete"
            onClick={handleDelete}
          />
        </div>
      }
    >
      <div
        className={`rek-video ${urlClass}`}
        {...attributes}
        contentEditable={false}
        data-slate-zero-width="z"
      >
        <div data-slate-void="true">
          <ReactPlayer url={element.url} light controls volume={undefined} />
        </div>
        <ModalPopup
          show={showSettings}
          element={element}
          onClickOutside={handleHideSettings}
          location="inside-bottom"
        >
          <VideoSettings {...props} />
        </ModalPopup>
        {children}
      </div>
    </DeletableElement>
  );
});

export interface VideoSettingsProps extends RenderElementProps {}

export const VideoSettings = memo((props: VideoSettingsProps) => {
  const { element } = props;
  const { editor } = useEditorKit();
  const { labels } = usePlugin<LabelsPlugin>("label-provider");
  const handleSave = (url: string) => {
    Transforms.setNodes(
      editor,
      { url },
      { at: ReactEditor.findPath(editor, element) }
    );
  };

  return (
    <SaveDialog
      className={"rek-video-settings"}
      saveButtonText={labels.save}
      placeholderText={labels.validVideoUrl}
      value={element.url}
      onSave={handleSave}
    />
  );
});

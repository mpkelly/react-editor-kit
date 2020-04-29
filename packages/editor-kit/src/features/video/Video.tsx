import React, { useState, useCallback, memo } from "react";
import { RenderElementProps, ReactEditor } from "slate-react";
import ReactPlayer from "react-player";
import { DeletableBlock } from "../blocks/DeletableBlock";
import { usePlugin } from "../../plugins/usePlugin";
import { Icon } from "../icons/Icon";
import { ModalPopup } from "../popup/ElementModalPopup";
import { stopEvent } from "../../ui/Utils";
import { useEditorKit } from "../../editor/EditorKit";
import { IconProvider } from "../icons/IconProviderPlugin";
import { Transforms } from "slate";
import { Labels } from "../i18n/LabelsPlugin";

export const Video = memo((props: RenderElementProps) => {
  const { attributes, element, children } = props;
  const { editor } = useEditorKit();
  const { data } = usePlugin("icon-provider") as IconProvider;
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
    <DeletableBlock
      {...props}
      toolbarContent={
        <div className="rek-video-toolbar rek-panel" data-slate-zero-width="z">
          <Icon icon={data.settings} onClick={handleShowSettings} />
          <div className="rek-v-toolbar-divider" />
          <Icon icon={data.delete} onClick={handleDelete} />
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
    </DeletableBlock>
  );
});

export interface VideoSettingsProps extends RenderElementProps {}

export const VideoSettings = memo((props: VideoSettingsProps) => {
  const { element } = props;
  const [url, setUrl] = useState(element.url);
  const { editor } = useEditorKit();
  const { data: labels } = usePlugin("labels") as Labels;
  const handleUrlChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUrl(event.currentTarget.value);
    },
    []
  );
  const handleSave = useCallback(() => {
    Transforms.setNodes(
      editor,
      { url },
      { at: ReactEditor.findPath(editor, element) }
    );
  }, [url]);

  return (
    <div
      className="rek-video-settings rek-panel"
      onClick={stopEvent}
      data-slate-zero-width="z"
    >
      <input
        autoFocus
        value={url}
        onChange={handleUrlChange}
        className="rek-input"
        placeholder={labels.validVideoUrl}
      />
      <button className="rek-button" onClick={handleSave}>
        {labels.save}
      </button>
    </div>
  );
});

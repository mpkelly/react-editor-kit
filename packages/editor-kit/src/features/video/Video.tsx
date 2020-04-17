import React, { useState, useCallback, memo } from "react";
import { RenderElementProps } from "slate-react";
import ReactPlayer from "react-player";
import { DeletableBlock } from "../blocks/DeletableBlock";
import { usePlugin } from "../../plugins/usePlugin";
import { Icon } from "../icons/Icon";
import { ModalPopup } from "../popup/ElementModalPopup";
import { stop } from "../../ui/Utils";
import { useEditorKit } from "../../editor/EditorKit";
import { HoverPopup } from "../popup/HoverPopup";
import { IconProvider } from "../icons/IconProviderPlugin";
import { Transforms } from "slate";

export const Video = memo((props: RenderElementProps) => {
  const { attributes, element, children } = props;
  const { data } = usePlugin("icon-provider") as IconProvider;
  const [showSettings, setShowSettings] = useState(!Boolean(element.url));

  const handleHideSettings = useCallback(() => {
    setShowSettings(false);
  }, []);
  const handleShowSettings = useCallback(() => {
    setShowSettings(true);
  }, []);

  return (
    <DeletableBlock {...props}>
      <div className="rek-video" contentEditable={false} {...attributes}>
        {element.url && <ReactPlayer url={element.url} light />}
        <HoverPopup element={element} location="inside-end">
          <div className="rek-video-toolbar rek-panel">
            <Icon icon={data.settings} onClick={handleShowSettings} />
          </div>
        </HoverPopup>
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
  const handleUrlChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUrl(event.currentTarget.value);
    },
    []
  );
  const handleSave = useCallback(() => {
    Transforms.setNodes(editor, { url });
  }, [url]);

  return (
    <div className="rek-video-settings rek-panel" onClick={stop}>
      <input
        autoFocus
        value={url}
        onChange={handleUrlChange}
        className="rek-input"
      />
      <button className="rek-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
});

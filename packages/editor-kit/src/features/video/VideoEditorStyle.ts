export const VideoEditorStyle = `
  .rek-video {
    position:relative;    
    min-height:120px;
  }

  .rek-video.rek-no-url {
    background-color: var(--gray-light2-color);
  }

  .rek-video div {
    margin: 0 auto;
  }

  .rek-video-toolbar {
    display:flex;
    align-items:center;
    justify-content:center;
    padding:4px;
  }

  .rek-video-toolbar .settings-icon {
    cursor:pointer;
    color: var(--secondary-text-color);
  }
  .rek-video-toolbar .settings-icon path {
    fill: var(--secondary-text-color);
    :hover {
      fill: var(--action-color);
    }
  }
`;

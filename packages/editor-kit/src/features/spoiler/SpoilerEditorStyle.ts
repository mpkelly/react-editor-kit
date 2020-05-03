export const SpoilerEditorStyle = `
.rek-spoiler {
  background-color: rgba(0,0,0,.95);
  display:inline-block;
  color: white;
}

.rek-spoiler.showspoiler {
  background-color: unset;
  color: var(--primary-text-color);
}

.rek-spoiler.hidespoiler {
  background-color: rgba(0,0,0,.95);
  color: transparent;
  pointer:cursor;
}
`;

import React, { useState } from "react";
import { Node, Range } from "slate";
import {
  Editor,
  EditorKit,
  Plugin,
  BoldPlugin,
  ItalicPlugin,
  BoldButton,
  ItalicButton,
  DefaultThemePlugin,
  EnterKeyHandler,
  UnderlineButton,
  StrikethroughButton,
  UnderlinePlugin,
  StrikethroughPlugin
} from "@mpkelly/react-editor-kit";

const plugins: Plugin[] = [
  DefaultThemePlugin,
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  StrikethroughPlugin,
  EnterKeyHandler
];

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "Text" }]
  }
];

const toolbarStyle = {
  display: "flex",
  background: "rgba(0,0,0,.1)",
  borderRadius: 3,
  width: 300,
  marginBottom: 8
};

const editorStyle = {
  width: 300,
  height: 200,
  padding: 8,
  border: "1px solid rgba(0,0,0,.1)",
  borderRadius: 3
};

export const SimpleEditor = () => {
  const [value, setValue] = useState<Node[]>(initialValue);
  return (
    <EditorKit plugins={plugins}>
      <div style={toolbarStyle}>
        <BoldButton className="uil uil-bold" />
        <ItalicButton className="uil uil-italic" />
        <UnderlineButton className="uil uil-underline" />
        <StrikethroughButton className="uil uil-text-strike-through" />
      </div>
      <Editor
        value={value}
        onChange={setValue}
        style={editorStyle}
        spellCheck
        autoFocus
      />
    </EditorKit>
  );
};

import React, { useState } from "react";
import { Node } from "slate";
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
  StrikethroughButton,
  StrikethroughPlugin,
  LinkButton,
  LinkPlugin,
  InlineCodePlugin,
  InlineCodeButton,
  OrderedListButton,
  UnorderedListButton,
  QuoteButton,
  QuotePlugin,
  OrderedListPlugin,
  UnorderedListPlugin,
  IconProviderPlugin,
  LabelsPlugin,
  HeadingToggleButton,
  SuperscriptPlugin,
  SuperscriptButton,
  H1Plugin,
  VideoPlugin,
  VideoButton,
  TablePlugin,
  TableButton,
  SpoilerPlugin,
  SpoilerButton,
  CodeHighlighterPlugin,
  createStaticMentions
} from "@mpkelly/react-editor-kit";
import { MentionsItems } from "../Mentions";

const RedditStylePlugin: Plugin = {
  globalStyles: () => GlobalStyle
};

const plugins: Plugin[] = [
  DefaultThemePlugin,
  BoldPlugin,
  ItalicPlugin,
  LinkPlugin,
  StrikethroughPlugin,
  InlineCodePlugin,
  OrderedListPlugin,
  UnorderedListPlugin,
  QuotePlugin,
  RedditStylePlugin,
  IconProviderPlugin,
  H1Plugin,
  SuperscriptPlugin,
  OrderedListPlugin,
  UnorderedListPlugin,
  VideoPlugin,
  TablePlugin,
  LabelsPlugin,
  SpoilerPlugin,
  CodeHighlighterPlugin,
  createStaticMentions({
    mentions: MentionsItems
  }),
  EnterKeyHandler
];

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }]
  }
];

const width = 700;
const borderRadius = 3;

const toolbarStyle = {
  width,
  display: "flex",
  background: "rgb(246, 247, 248)",
  borderRadius,
  padding: 4,
  marginBottom: 8
};

const editorStyle = {
  height: 200,
  width,
  padding: 8,
  border: "1px solid rgba(0,0,0,.1)",
  borderRadius,
  overflow: "auto"
};

// Make sure to load the icon font: <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons+Round|">

export const RedditEditor = () => {
  const [value, setValue] = useState<Node[]>(initialValue);
  return (
    <EditorKit plugins={plugins}>
      <div style={toolbarStyle}>
        <BoldButton className="material-icons-round" ligature="format_bold" />
        <ItalicButton
          className="material-icons-round"
          ligature="format_italic"
        />
        <LinkButton className="material-icons-round" ligature="link" />
        <StrikethroughButton
          className="material-icons-round"
          ligature="format_strikethrough"
        />
        <InlineCodeButton className="material-icons-round" ligature="code" />

        <SuperscriptButton className="material-icons-round" ligature="height" />
        <SpoilerButton className="material-icons-round" ligature="error" />
        <OrderedListButton
          className="material-icons-round"
          ligature="format_list_numbered"
        />
        <UnorderedListButton
          className="material-icons-round"
          ligature="format_list_bulleted"
        />
        <HeadingToggleButton
          className="material-icons-round"
          ligature="format_size"
        />
        <QuoteButton className="material-icons-round" ligature="format_quote" />
        <TableButton className="material-icons-round" ligature="grid_on" />
        <VideoButton className="material-icons-round" ligature="videocam" />
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

const GlobalStyle = `

  .rek-icon-button {
    height: 28px;
    width: 28px;
    border-radius: 4px;
  }

  .rek-icon-button:hover {
    background-color: rgba(26, 26, 27, 0.1);
  }

  .rek-icon-button.rek-css-icon {
    color: rgb(135, 138, 140) !important;
    font-size: 20px !important;
  }
`;

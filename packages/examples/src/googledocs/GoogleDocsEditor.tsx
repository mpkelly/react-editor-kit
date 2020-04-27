import React, { useState, CSSProperties } from "react";
import { Node } from "slate";
import {
  Editor,
  EditorKit,
  Plugin,
  BoldPlugin,
  ItalicPlugin,
  BoldButton,
  ItalicButton,
  StrikethroughButton,
  UnderlinePlugin,
  StrikethroughPlugin,
  LinkButton,
  InlineCodeButton,
  SuperscriptButton,
  OrderedListButton,
  UnorderedListButton,
  HeadingToggleButton,
  QuoteButton,
  TableButton,
  VideoButton,
  LinkPlugin,
  InlineCodePlugin,
  OrderedListPlugin,
  UnorderedListPlugin,
  QuotePlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
  H4Plugin,
  H5Plugin,
  H6Plugin,
  SuperscriptPlugin,
  VideoPlugin,
  TablePlugin,
  CodeHighlighterPlugin,
  LabelsPlugin,
  HeadingSelect,
  FontSizeSelect,
  FontSelect,
  StylePlugin,
  Divider,
  TextAlignLeftButton,
  TextAlignRightButton,
  TextAlignCenterButton,
  TextAlignJustifiedButton,
  ColorPickerButton,
  HistoryPlugin,
  ClearFormattingButton,
  DividerPlugin,
  createBreakoutPlugin,
  ConstraintsPlugin,
  SelectionToolbarPlugin,
  SelectionToolbar,
  EditorToolbar,
  EditorToolbarPlugin,
  createStaticMentions,
  TextAlignPlugin,
  SpellCheckButton,
  ReadOnlyButton,
  Rule,
  RulePlugin,
  Resizable,
  ImagePlugin,
  InfoAlertPlugin,
  ErrorAlertPlugin,
  WarningAlertPlugin,
  createInitialLetterPlugin,
  TodoListPlugin,
} from "@mpkelly/react-editor-kit";
import { MentionsItems } from "../Mentions";
import { createStaticHashtags } from "./HashtagSuggestionPlugin";
import { createEmoticonSuggestions } from "./EmoticonSuggestions";
import { InsertContextMenuPlugin } from "./InsertContextMenuPlugin";
import { FormatContextMenuPlugin } from "./FormatContextMenuPlugin";

const GoogleDocsStylePlugin: Plugin = {
  globalStyles: () => `
    .rek-editor-toolbar .rek-icon-button {
      color: rgba(0,0,0,.6);
    }
  `,
};

const plugins: Plugin[] = [
  ItalicPlugin,
  BoldPlugin,
  LinkPlugin,
  StrikethroughPlugin,
  InlineCodePlugin,
  UnderlinePlugin,
  QuotePlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
  H4Plugin,
  H5Plugin,
  H6Plugin,
  SuperscriptPlugin,
  OrderedListPlugin,
  UnorderedListPlugin,
  VideoPlugin,
  TextAlignPlugin,
  TablePlugin,
  CodeHighlighterPlugin,
  LabelsPlugin,
  createStaticMentions({
    mentions: MentionsItems,
  }),
  StylePlugin,
  GoogleDocsStylePlugin,
  createBreakoutPlugin(),
  DividerPlugin,
  HistoryPlugin,
  ConstraintsPlugin,
  SelectionToolbarPlugin,
  EditorToolbarPlugin,

  RulePlugin,
  ImagePlugin,
  InfoAlertPlugin,
  WarningAlertPlugin,
  ErrorAlertPlugin,
  createStaticHashtags({
    hashtags: [
      "#twitter",
      "#hastags",
      "#orange",
      "#blue",
      "turquoise",
      "#purple",
    ],
  }),
  TodoListPlugin,
  createEmoticonSuggestions(),
  createInitialLetterPlugin(),
  // InsertContextMenuPlugin,
  // FormatContextMenuPlugin,
];

const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        text: "",
      },
    ],
  },
];

const wrapperStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
  height: "100%",
};

const editorStyle: CSSProperties = {
  width: "100%",
  minHeight: 1066,
  padding: 16,
  border: "1px solid rgba(0,0,0,.1)",
  boxShadow: "rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
  borderRadius: 3,
  backgroundColor: "white",
};

const editorWrapperStyle: CSSProperties = {
  width: "100%",
  backgroundColor: "rgb(248, 249, 250)",
  borderTop: "1px solid rgba(0,0,0,.1)",
  display: "flex",
  justifyContent: "center",
  overflow: "hidden",
  padding: 8,
};

export const GoogleDocsEditor = () => {
  const [value, setValue] = useState<Node[]>(initialValue);
  return (
    <EditorKit plugins={plugins}>
      <div style={wrapperStyle}>
        <EditorToolbar>
          <HeadingSelect />
          <Divider />
          <FontSelect />
          <Divider />
          <FontSizeSelect />
          <Divider />
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

          <SuperscriptButton
            className="material-icons-round"
            ligature="height"
          />
          <Divider />
          <ColorPickerButton
            className="material-icons-round"
            ligature="palette"
          />
          <Divider />
          <TextAlignLeftButton
            className="material-icons-round"
            ligature="format_align_left"
          />
          <TextAlignCenterButton
            className="material-icons-round"
            ligature="format_align_center"
          />
          <TextAlignRightButton
            className="material-icons-round"
            ligature="format_align_right"
          />
          <TextAlignJustifiedButton
            className="material-icons-round"
            ligature="format_align_justify"
          />
          <Divider />
          <OrderedListButton
            className="material-icons-round"
            ligature="format_list_numbered"
          />
          <UnorderedListButton
            className="material-icons-round"
            ligature="format_list_bulleted"
          />
          <Divider />
          <HeadingToggleButton
            className="material-icons-round"
            ligature="format_size"
          />
          <QuoteButton
            className="material-icons-round"
            ligature="format_quote"
          />
          <TableButton className="material-icons-round" ligature="grid_on" />
          <VideoButton className="material-icons-round" ligature="videocam" />
          <Divider />
          <ClearFormattingButton
            className="material-icons-round"
            ligature="format_clear"
          />
          <SpellCheckButton
            className="material-icons-round"
            ligature="spellcheck"
          />
          <ReadOnlyButton
            className="material-icons-round"
            ligature="lock_open"
            readOnlyClassName="material-icons-round"
            readOnlyLigature="lock"
          />
        </EditorToolbar>
        {/* <SelectionToolbar>
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
        </SelectionToolbar> */}
        <div style={editorWrapperStyle}>
          <Resizable initialWidth={826}>
            <Editor
              value={value}
              onChange={(value: any) => {
                console.log(JSON.stringify(value));
                setValue(value);
              }}
              style={editorStyle}
              autoFocus
            />
          </Resizable>
        </div>
      </div>
    </EditorKit>
  );
};

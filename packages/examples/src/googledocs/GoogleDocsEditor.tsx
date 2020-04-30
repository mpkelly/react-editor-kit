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
  createFixedTitlePlugin,
  TodoListPlugin,
  createFixedBlock,
  createOutline,
  OutlineEntry,
  ImageButton,
  UploadImageMenuItem,
  InsertImageByUrlMenuItem,
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
  InsertContextMenuPlugin,
  FormatContextMenuPlugin,
  // createFixedTitlePlugin(),
];

const initialValue = [
  // createFixedBlock(),
  {
    type: "paragraph",
    children: [
      {
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        text:
          "\n\nForem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        text:
          "\n\nDorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
          <BoldButton
            className="material-icons-round"
            ligature="format_bold"
            tooltipLocation={"start"}
            tooltipComponent={<span>HELLO World</span>}
          />
          <ItalicButton
            className="material-icons-round"
            ligature="format_italic"
            tooltipText={"This is italic!"}
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
          <ImageButton className="material-icons-round" ligature="insert_photo">
            <UploadImageMenuItem
              icon={{
                className: "material-icons-round",
                ligature: "publish",
              }}
              text={"Upload image"}
            />
            <InsertImageByUrlMenuItem
              icon={{
                className: "material-icons-round",
                ligature: "link",
              }}
              text={"Insert by URL"}
            />
          </ImageButton>
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
                // console.log(value);
                // console.log(JSON.stringify(value));
                setValue(value);
              }}
              style={editorStyle}
              autoFocus
            />
          </Resizable>
        </div>
      </div>
      <SimpleOutline nodes={value} />
    </EditorKit>
  );
};

export const SimpleOutline = (props: { nodes: Node[] }) => {
  const { nodes } = props;
  const outline = createOutline(nodes);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        left: 16,
        top: 100,
      }}
    >
      {outline.map((entry: OutlineEntry) => {
        return <p style={{ paddingLeft: entry.depth * 16 }}>{entry.content}</p>;
      })}
    </div>
  );
};

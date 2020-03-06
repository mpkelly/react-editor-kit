import React, { useState, CSSProperties, useEffect } from "react";
import { Node } from "slate";
import {
  Editor,
  EditorKit,
  Plugin,
  BoldPlugin,
  ItalicPlugin,
  BoldButton,
  ItalicButton,
  EnterKeyHandler,
  StrikethroughButton,
  UnderlinePlugin,
  UnderlineButton,
  StrikethroughPlugin,
  LinkButton,
  InlineCodeButton,
  SuperscriptButton,
  SubscriptButton,
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
  SubscriptPlugin,
  SuperscriptPlugin,
  VideoPlugin,
  TablePlugin,
  CodeHighlighterPlugin,
  HeadingSelect,
  FontSizeSelect,
  FontSelect,
  StylePlugin,
  Divider,
  TextAlignLeftButton,
  TextAlignRightButton,
  TextAlignCenterButton,
  TextAlignJustifiedButton,
  FontColorPickerButton,
  BackgroundColorPickerButton,
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
  ImagePlugin
} from "../src/Index";
import ReactDOM from "react-dom";

const TestEditorStylePlugin: Plugin = {
  globalStyles: () => `
    .rek-editor-toolbar-wrapper {
      flex:none;
    }
    .rek-editor-toolbar {
      flex:none;
    }
    .rek-editor-toolbar .rek-icon-button {
      color: rgba(0,0,0,.6);
    }

  `
};

const plugins: Plugin[] = [
  ItalicPlugin,
  BoldPlugin,
  LinkPlugin,
  StrikethroughPlugin,
  InlineCodePlugin,
  UnderlinePlugin,
  OrderedListPlugin,
  UnorderedListPlugin,
  QuotePlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
  H4Plugin,
  H5Plugin,
  H6Plugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  OrderedListPlugin,
  UnorderedListPlugin,
  VideoPlugin,
  TablePlugin,
  CodeHighlighterPlugin,
  EnterKeyHandler,
  StylePlugin,
  TestEditorStylePlugin,
  CodeHighlighterPlugin,
  createBreakoutPlugin(),
  DividerPlugin,
  HistoryPlugin,
  ConstraintsPlugin,
  SelectionToolbarPlugin,
  EditorToolbarPlugin,
  TextAlignPlugin,
  ImagePlugin,
  createStaticMentions({
    mentions: [
      { name: "Anna Smith" },
      { name: "Brian Small" },
      { name: "Carly Simon" },
      { name: "Dave Jones" }
    ]
  })
];

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }]
  }
];

const wrapperStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
  height: "100%"
};

const editorStyle: CSSProperties = {
  width: "100%",
  maxWidth: 826,
  height: 1066,
  padding: 8,
  border: "1px solid rgba(0,0,0,.1)",
  boxShadow: "rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
  borderRadius: 3,
  backgroundColor: "white"
};

const editorWrapperStyle: CSSProperties = {
  width: "100%",
  backgroundColor: "rgb(248, 249, 250)",
  borderTop: "1px solid rgba(0,0,0,.1)",
  display: "flex",
  flex: 1,
  justifyContent: "center",
  overflow: "hidden",
  padding: 8
};

export const TestEditor = () => {
  const [value, setValue] = useState<Node[]>(initialValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fonts = (document as any).fonts;
    fonts.ready.then(function() {
      setLoaded(true);
    });
  }, []);
  if (!loaded) {
    return null;
  }
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
          <UnderlineButton
            className="material-icons-round"
            ligature="format_underlined"
          />
          <SuperscriptButton
            className="material-icons-round"
            ligature="vertical_align_top"
          />
          <SubscriptButton
            className="material-icons-round"
            ligature="vertical_align_bottom"
          />
          <InlineCodeButton className="material-icons-round" ligature="code" />

          <Divider />
          <FontColorPickerButton
            className="material-icons-round"
            ligature="text_format"
          />
          <BackgroundColorPickerButton
            className="material-icons-round"
            ligature="format_paint"
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
          <Editor
            value={value}
            onChange={setValue}
            style={editorStyle}
            spellCheck
            autoFocus
          />
        </div>
      </div>
    </EditorKit>
  );
};

ReactDOM.render(<TestEditor />, document.getElementById("app"));

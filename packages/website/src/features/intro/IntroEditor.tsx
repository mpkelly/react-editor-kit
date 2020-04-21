import React, { useState } from "react";
import styled from "styled-components";
import { Theme } from "../../ui/Theme";
import { MentionsItems } from "../../../../examples/src/Mentions";
import { Node } from "slate";
import {
  EditorKit,
  Plugin,
  HeadingSelect,
  Divider,
  FontSelect,
  FontSizeSelect,
  BoldButton,
  ItalicButton,
  StrikethroughButton,
  ColorPickerButton,
  TextAlignLeftButton,
  TextAlignCenterButton,
  TextAlignRightButton,
  TextAlignJustifiedButton,
  OrderedListButton,
  UnorderedListButton,
  QuoteButton,
  Editor,
  DefaultThemePlugin,
  BoldPlugin,
  ItalicPlugin,
  LinkPlugin,
  StrikethroughPlugin,
  InlineCodePlugin,
  OrderedListPlugin,
  UnorderedListPlugin,
  QuotePlugin,
  IconProviderPlugin,
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
  StylePlugin,
  EditorToolbar,
  EditorToolbarPlugin,
  HistoryPlugin,
  LinkButton,
  InlineCodeButton,
  TextAlignPlugin,
  createStaticMentions,
} from "@mpkelly/react-editor-kit";

export const IntroEditor = () => {
  const [value, setValue] = useState<Node[]>(initialValue);
  return (
    <IntroEditorContent id="intro-editor">
      <EditorKit plugins={plugins}>
        <div>
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
            />
            <ItalicButton
              className="material-icons-round"
              ligature="format_italic"
            />
            <StrikethroughButton
              className="material-icons-round"
              ligature="format_strikethrough"
            />
            <InlineCodeButton
              className="material-icons-round"
              ligature="code"
            />
            <Divider />
            <LinkButton className="material-icons-round" ligature="link" />
            <Divider />
            <ColorPickerButton
              className="material-icons-round"
              ligature="text_format"
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
            <QuoteButton
              className="material-icons-round"
              ligature="format_quote"
            />
          </EditorToolbar>
          <Editor value={value} onChange={setValue} autoFocus />
        </div>
      </EditorKit>
    </IntroEditorContent>
  );
};

const IntroEditorPlugin: Plugin = {
  globalStyles: () => `

  .rek-editor-toolbar-overflow,
  .rek-editor-toolbar-wrapper  {
    .rek-panel {
      background-color:var(--site-background-color);
      color:var(--site-primary-color);
    }        
  }

  .rek-floating-content {
    .rek-icon-button.active {
      background-color:var(--site-background-color);
      color: white;
    }

  }

  #intro-editor {

    .rek-icon path {
      fill:var(--site-primary-color);
    }

    .rek-icon-button  {
      color:var(--site-primary-color);
    }

    .rek-editor-toolbar-overflow,
    .rek-editor-toolbar-wrapper  {
      background-color:var(--site-background-color);
    }

    .rek-icon-button.active {
      background-color:var(--site-primary-color);
      color:var(--site-background-color);
    }

    .rek-v-toolbar-divider {
      background-color:var(--site-primary-color);
      opacity:.5;
    }

    [data-slate-editor="true"] {
      width: 100%;
      height: 400px;
      border: 1px solid #e8c415;
      border-radius:3px;
      padding: 0 16px;
      overflow:auto;
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      pre,
      blockquote,
      p,
      li 
      {
        color:white;      
      }

      blockquote {
        border-left: 3px solid var(--site-primary-color);
        padding-left:8px;
      }
    }

    .rek-select input {
      color:var(--site-primary-color);
    }
  
    .dropdown-icon path {
      fill:var(--site-primary-color);
    }
  
    .rek-select.focus {
      border-color:var(--site-primary-color);
    }
  
    .rek-select-list {
      background-color:#171717;
      color:var(--site-primary-color);
    }

    a {
      text-decoration-color:var(--site-primary-color);
      color:var(--site-primary-color);
    }

  }
  
  
`,
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
  IconProviderPlugin,
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
  TablePlugin,
  CodeHighlighterPlugin,
  LabelsPlugin,
  StylePlugin,
  HistoryPlugin,
  IntroEditorPlugin,
  EditorToolbarPlugin,
  createStaticMentions({
    mentions: MentionsItems,
  }),
  TextAlignPlugin,
];

const initialValue: Node[] = [
  {
    type: "paragraph",
    textAlign: "center",
    children: [
      {
        type: "h1",
        children: [{ text: "Getting Started", fontFamily: "sans-serif" }],
      },
    ],
  },
  {
    type: "ordered-list",
    children: [
      {
        type: "list-item",
        children: [
          { text: "Install the NPM Package:\n\n" },
          { text: "npm i @mpkelly/react-editor-kit\n", "inline-code": true },
        ],
      },
      {
        type: "list-item",
        children: [
          {
            text:
              "Optionally load your icon font if using one. You can check this ",
          },
          {
            type: "link",
            url: "http://192.168.43.118:8089/packages/website/dist/index.html",
            children: [{ text: "file" }],
          },
          {
            text:
              " which loads the Material Icons Round font as used by this Editor. \n",
          },
        ],
      },
      {
        type: "list-item",
        children: [
          {
            text: "Create your Editor component. You can start by copying the ",
          },
          {
            type: "link",
            url: "http://192.168.43.118:8089/packages/website/dist/index.html",
            children: [{ text: "SimpleExample" }],
          },
          { text: " or more complex " },
          {
            type: "link",
            url: "http://192.168.43.118:8089/packages/website/dist/index.html",
            children: [{ text: "GoogleDocsExample" }],
          },
          { text: ". \n" },
        ],
      },
      {
        type: "list-item",
        children: [
          { text: "That's it! You'll probably want to read over " },
          {
            type: "link",
            url: "http://192.168.43.118:8089/packages/website/dist/index.html",
            children: [{ text: "concepts" }],
          },
          {
            text: " and then browse through the docs to learn about the other ",
          },
          {
            type: "link",
            url: "http://192.168.43.118:8089/packages/website/dist/index.html",
            children: [{ text: "features" }],
          },
          { text: " and plugins offered. \n" },
        ],
      },
    ],
  },
  {
    type: "paragraph",
    textAlign: "center",
    children: [{ type: "h3", children: [{ text: "Basic Code Structure" }] }],
  },
  {
    type: "code-block",
    children: [
      {
        text:
          "const Editor = () => {\n  const [value, setValue] = useState<Node[]>(initialValue);\n  <EditorKit plugins={plugins}>\n    {/* Include toolbars, controls etc here inside of the <EditorKit/> */}\n    <Editor\n      value={value}\n      onChange={setValue}\n    />\n  </EditorKit>\n}",
      },
    ],
    lang: "JavaScript",
  },
  { type: "paragraph", children: [{ text: "\n" }] },
  { type: "paragraph", children: [{ text: "\n" }] },
  { type: "paragraph", children: [{ text: "\n" }] },
];

export const IntroEditorContent = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${Theme.corners.md};
  background-color: ${Theme.backgroundColor};
  height: 500px;
  width: 840px;
  padding: 16px;
`;

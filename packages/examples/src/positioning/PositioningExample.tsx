import React, { useState } from "react";
import { Node, Range } from "slate";
import {
  Editor,
  EditorKit,
  Plugin,
  DefaultThemePlugin,
  EditorRange,
  ModalPopup
} from "@mpkelly/react-editor-kit";
import { RenderElementProps } from "slate-react";

const PositionPlugin: Plugin = {
  withPlugin: editor => {
    const { isInline } = editor;
    editor.isInline = element =>
      element.type === "anchor" ? true : isInline(element);
    return editor;
  },
  renderElement: (props: RenderElementProps) => {
    const { element } = props;
    if (element.type === "anchor") {
      return <InlineAnchor {...props} />;
    }
    if (element.type === "block") {
      return <BlockAnchor {...props} />;
    }
    return undefined;
  }
};

const InlineAnchor = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div {...attributes} style={{ color: "green" }}>
        {children}
      </div>
      <ModalPopup element={element} location="start" show>
        <Popup text={"A"} />
      </ModalPopup>
      <ModalPopup element={element} location="end" show>
        <Popup text={"B"} />
      </ModalPopup>
      <ModalPopup element={element} location="top" show>
        <Popup text={"C"} />
      </ModalPopup>
      <ModalPopup element={element} location="bottom" show>
        <Popup text={"D"} />
      </ModalPopup>
    </div>
  );
};

const BlockAnchor = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
  return (
    <div
      style={{
        position: "relative",
        display: "block"
      }}
    >
      <div {...attributes} style={{ backgroundColor: "blue", minHeight: 200 }}>
        {children}
      </div>
      <ModalPopup element={element} location="inside-start" show>
        <Popup text={"A"} />
      </ModalPopup>
      <ModalPopup element={element} location="inside-top" show>
        <Popup text={"B"} />
      </ModalPopup>
      <ModalPopup element={element} location="inside-end" show>
        <Popup text={"C"} />
      </ModalPopup>
      <ModalPopup element={element} location="inside-bottom" show>
        <Popup text={"D"} />
      </ModalPopup>
    </div>
  );
};

const Popup = (props: { text: string }) => {
  return (
    <span style={{ background: "rgba(0,0,0.8)", color: "white" }}>
      <span style={{ padding: 8 }}>{props.text}</span>
    </span>
  );
};

const plugins: Plugin[] = [DefaultThemePlugin, PositionPlugin];
const initialValue: Node[] = [
  {
    children: [
      {
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum "
      },
      {
        type: "anchor",
        children: [
          {
            text: "Anchor node "
          }
        ]
      },
      {
        text:
          " dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
      },
      {
        type: "block",
        children: [{ text: "" }]
      }
    ]
  }
];

const editorStyle = {
  width: 500,
  height: 500,
  padding: 8,
  border: "1px solid rgba(0,0,0,.1)",
  borderRadius: 3,
  overflow: "auto"
};

const containerStyle = {
  display: "flex"
};

export interface State {
  ranges: Range[];
  pattern: string;
  regex: boolean;
  matchRange: EditorRange;
}

export const PositioningExample = () => {
  return (
    <EditorKit plugins={plugins}>
      <PositioningEditor />
    </EditorKit>
  );
};

export const PositioningEditor = () => {
  const [value, setValue] = useState(initialValue);
  return (
    <div style={containerStyle}>
      <Editor value={value} onChange={setValue} style={editorStyle} autoFocus />
    </div>
  );
};

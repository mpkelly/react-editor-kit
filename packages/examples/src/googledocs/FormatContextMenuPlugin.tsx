import React from "react";
import {
  Plugin,
  MenuItem,
  BoldMenuItem,
  ItalicMenuItem,
  UnderlineMenuItem,
  StrikethroughMenuItem,
  SubscriptMenuItem,
  SuperscriptMenuItem,
  ClearFormattingMenuItem,
} from "@mpkelly/react-editor-kit";

export const FormatContextMenuPlugin: Plugin = {
  name: "format-context-menu",
  contextMenu: [
    {
      //No trigger - always allowed
      items: [
        <MenuItem text={"Format"}>
          <BoldMenuItem text="Bold" />
          <ItalicMenuItem text="Italic" />
          <UnderlineMenuItem text="Underline" />
          <StrikethroughMenuItem text="Strikethrough" />
          <SubscriptMenuItem text="Subscript" />
          <SuperscriptMenuItem text="Superscript" />
          <ClearFormattingMenuItem text="Clear formatting" />
        </MenuItem>,
      ],
    },
  ],
};

import React from "react";
import {
  Plugin,
  MenuItem,
  TableMenuItem,
  AlertMenuItem,
  CodeMenuItem,
  VideoMenuItem,
  HeadingMenuItem,
  BlockquoteMenuItem,
} from "@mpkelly/react-editor-kit";

export const InsertContextMenuPlugin: Plugin = {
  name: "insert-context-menu",
  contextMenu: [
    {
      //No trigger - always allowed
      items: [
        <MenuItem text={"Insert"}>
          <MenuItem text="Headings">
            <HeadingMenuItem type="h1" text="Heading 1" />
            <HeadingMenuItem type="h2" text="Heading 2" />
            <HeadingMenuItem type="h3" text="Heading 3" />
            <HeadingMenuItem type="h4" text="Heading 4" />
            <HeadingMenuItem type="h5" text="Heading 5" />
            <HeadingMenuItem type="h6" text="Heading 6" />
          </MenuItem>
          <div className="rek-h-divider" />
          <BlockquoteMenuItem text="Blockquote" />
          <CodeMenuItem text="Code Block" />
          <TableMenuItem text="Table" />
          <VideoMenuItem text="Video" />
          <div className="rek-h-divider" />
          <MenuItem text="Alerts">
            <AlertMenuItem type="info-alert" text="Info" />
            <AlertMenuItem type="warning-alert" text="Warning" />
            <AlertMenuItem type="error-alert" text="Error" />
          </MenuItem>
        </MenuItem>,
      ],
    },
  ],
};

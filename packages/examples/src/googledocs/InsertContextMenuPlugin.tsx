import React from "react";
import {
  Plugin,
  MenuItem,
  TableMenuItem,
  AlertMenuItem,
  CodeBlockMenuItem,
  VideoMenuItem,
} from "@mpkelly/react-editor-kit";

export const InsertContextMenuPlugin: Plugin = {
  contextMenu: [
    {
      //No trigger - always allowed
      items: [
        <MenuItem text={"Insert"}>
          <TableMenuItem text="Table" />
          <CodeBlockMenuItem text="Code Block" />
          <VideoMenuItem text="Video" />
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

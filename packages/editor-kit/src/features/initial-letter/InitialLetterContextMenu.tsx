import React from "react";
import { ContextMenuContribution } from "../context-menu/ContextMenu";
import { isInitialLetterActive } from "./InitialLetterPluginAction";
import { InitialLetterMenuItem } from "./InitialLetterMenuItem";
import { InitialLetterPluginOptions } from "./InitialLetterPlugin";

export const createInitialLetterContextMenu = (
  options: InitialLetterPluginOptions
): ContextMenuContribution[] => [
  {
    trigger: {
      matched: ({ editor }) => {
        return !isInitialLetterActive(editor);
      },
    },
    items: [
      <InitialLetterMenuItem
        labelKey={"initialLetterOn"}
        icon={options.onIcon}
      />,
    ],
  },
  {
    trigger: {
      matched: ({ editor }) => {
        return isInitialLetterActive(editor);
      },
    },
    items: [
      <InitialLetterMenuItem
        labelKey={"initialLetterOff"}
        icon={options.onIcon}
      />,
    ],
  },
];

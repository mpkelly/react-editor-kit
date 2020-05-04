import React from "react";
import { Range, Transforms } from "slate";
import { Plugin } from "../../plugins/Plugin";
import { clone } from "../../ui/Utils";
import { RenderLeafProps } from "slate-react";
import { SelectionPluginEditorStyles } from "./SelectionPluginEditorStyle";

export const SelectionExtensionsPlugin: Plugin = {
  name: "selection-extension",
  withPlugin: (editor) => {
    editor.markSelection = () => {
      const { selection } = editor;
      if (selection && Range.isExpanded(selection)) {
        editor.markedSelection = clone(selection);
      }
    };
    editor.addSelectionMark = (key: string, value: any) => {
      if (editor.markedSelection) {
        Transforms.select(editor, editor.markedSelection);
        editor.markedSelection = null;
        editor.addMark(key, value);
      } else {
        editor.nextMark = { key, value };
      }
    };
    return editor;
  },
  onClick: (event, { editor }) => {
    editor.markedSelection = null;
  },
  renderLeaf: (props: RenderLeafProps) => {
    const { attributes, leaf, children } = props;
    if (leaf.type && leaf.type["selection-marker"]) {
      return (
        <span {...attributes} className="rek-selection-marker">
          {children}
        </span>
      );
    }
    return undefined;
  },
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>, { editor }) => {
    if (editor.nextMark) {
      const { key, value } = editor.nextMark;
      editor.addMark(key, value);
      editor.nextMark = undefined;
    }
    return false;
  },
  editorStyle: SelectionPluginEditorStyles,
};

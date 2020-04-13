import React from "react";
import { Range, Transforms } from "slate";
import { Plugin } from "../../plugins/Plugin";
import { clone } from "../../ui/Utils";
import { RenderLeafProps, ReactEditor } from "slate-react";

export const SelectionExtensionsPlugin: Plugin = {
  withPlugin: (editor) => {
    editor.markSelection = () => {
      const { selection } = editor;
      if (selection && Range.isExpanded(selection)) {
        editor.lastSelection = clone(selection);
      }
    };
    editor.addSelectionMark = (key: string, value: any) => {
      if (editor.lastSelection) {
        Transforms.select(editor, editor.lastSelection);
        editor.lastSelection = null;
        editor.addMark(key, value);
      } else {
        editor.nextMark = { key, value };
      }
    };
    return editor;
  },
  onClick: (event: React.MouseEvent, editor: ReactEditor) => {
    editor.lastSelection = null;
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
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>, editor: ReactEditor) => {
    if (editor.nextMark) {
      const { key, value } = editor.nextMark;
      editor.addMark(key, value);
      editor.nextMark = undefined;
    }
    return undefined;
  },
  editorStyles: () => EditorStyles,
};

const EditorStyles = `
  .rek-selection-marker {
    background-color: var(--selection-color);
    padding: 8px 0;
  }
`;

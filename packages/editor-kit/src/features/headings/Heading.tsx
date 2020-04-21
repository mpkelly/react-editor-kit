import { Plugin, Trigger } from "../../plugins/Plugin";
import { RenderElementProps, ReactEditor } from "slate-react";
import { renderElement } from "../elements/ElementRenderer";
import { toggleBlock } from "../blocks/Blocks";
import { EditorRange } from "../../editor/Ranges";
import { deleteBackward } from "../../editor/Editor";
import { MatchResult } from "../../editor/Matching";

export const createHeadingPlugin = (
  type: string,
  triggers: Trigger[] = []
): Plugin => {
  return {
    triggers: triggers,
    onTrigger: (editor: ReactEditor, matches: MatchResult[]) => {
      if (editor.isNodeSupported(type)) {
        const range = matches[0].range;
        const length = range.focus.offset - range.anchor.offset;
        deleteBackward(editor, length);
        toggleBlock(editor, type);
      }
    },
    renderElement: (props: RenderElementProps) => {
      return renderElement(props, type, type);
    },
  };
};

export const createDefaultHeadingPlugin = (
  type: string,
  patterns: string[]
) => {
  const triggers: Trigger[] = [
    { pattern: new RegExp(`^:${type}`), range: "line-before" as EditorRange },
  ].concat(
    patterns.map((pattern) => ({
      pattern: new RegExp(`^${pattern}`),
      range: "line-before",
    }))
  );

  return createHeadingPlugin(type, triggers);
};

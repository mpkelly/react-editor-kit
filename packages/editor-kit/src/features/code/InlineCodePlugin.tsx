import { Plugin } from "../../plugins/Plugin";
import { RenderLeafProps, ReactEditor } from "slate-react";
import { renderLeaf } from "../leafs/LeafRenderer";
import { applyRegexMark } from "../marks/Marks";
import { MatchResult } from "../../Index";

export const InlineCodePlugin: Plugin = {
  triggers: [{ pattern: /(`)(.{1,})\1/, range: "block" }],
  onTrigger: (editor: ReactEditor, matches: MatchResult[]) => {
    applyRegexMark(editor, matches[0], "inline-code");
  },
  renderLeaf: (props: RenderLeafProps) => {
    return renderLeaf(props, "inline-code", "code");
  },
  editorStyles: () => EditorStyles,
};

const EditorStyles = `
  span code {
    font-family:inherit;
    background-color: rgba(9, 30, 66, 0.08);
    box-shadow: rgba(9, 30, 66, 0.08) -4px 0px 0px 0px, rgba(9, 30, 66, 0.08) 4px 0px 0px 0px;
    padding: 2px 0px;
    border-radius: 3px;
    border-style: none;
    margin: 0px 4px;
  }
`;

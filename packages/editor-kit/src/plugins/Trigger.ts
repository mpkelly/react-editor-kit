import { EditorRange } from "../editor/Ranges";
import { MatchExpression, MatchResult } from "../editor/Matching";
import { EditorState } from "../editor/EditorState";
import { Plugin } from "./Plugin";

export type Trigger = {
  /**
   * Plain string or a RegExp
   */
  pattern: MatchExpression;

  /**
   * Called if the pattern above is matched. There might be more than
   * one result.
   */
  onMatch?: (state: EditorState, match: MatchResult[], plugin: Plugin) => void;

  /**
   * The range that should be check for the `pattern`
   * which defaults to the current Element
   */
  range?: EditorRange;

  /**
   * Defaults to true. Automatically clear the matched text e.g. strip out
   * markdown triggers like #### for a H4.
   */
  clear?: boolean;
};

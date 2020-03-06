import { Range } from "slate";
import { ReactEditor } from "slate-react";
import { EditorRange } from "./Ranges";
export declare type MatchExpression = string | RegExp;
export interface MatchResult {
    range: Range;
    regexMatch?: RegExpMatchArray;
}
export declare const findMatches: (expression: string | RegExp, range: EditorRange, editor: ReactEditor) => MatchResult[];

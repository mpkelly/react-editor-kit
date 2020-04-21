import { Range, Editor } from "slate";
import { ReactEditor } from "slate-react";
import { EditorRange, after, Unit, before, all, block } from "./Ranges";

export type MatchExpression = string | RegExp;

export interface MatchResult {
  range: Range;
  regexMatch?: RegExpMatchArray;
}

export const findMatches = (
  expression: MatchExpression,
  editor: ReactEditor,
  range?: EditorRange
): MatchResult[] => {
  range = range || "block";
  switch (range) {
    case "block":
      return searchAll(expression, editor, "block");
    case "block-before":
      return searchBefore(expression, editor, "block");
    case "block-after":
      return searchAfter(expression, editor, "block");
    case "line":
      return searchAll(expression, editor, "line");
    case "line-before":
      return searchBefore(expression, editor, "line");
    case "line-after":
      return searchAfter(expression, editor, "line");
    case "word-before":
      return searchBefore(expression, editor, "word");
    case "word-after":
      return searchAfter(expression, editor, "word");
    case "character-before":
      return searchBefore(expression, editor, "character");
    case "character-after":
      return searchAfter(expression, editor, "character");
  }
  return [];
};

const searchAll = (
  expression: MatchExpression,
  editor: ReactEditor,
  unit: Unit
): MatchResult[] => {
  const { selection } = editor;
  if (selection && Range.isCollapsed(selection)) {
    const range = all(editor, unit);
    if (range) {
      return matchesForRange(expression, editor, range, 0);
    }
  }
  return [];
};

const searchBefore = (
  expression: MatchExpression,
  editor: ReactEditor,
  unit: Unit
): MatchResult[] => {
  const { selection } = editor;
  if (selection && Range.isCollapsed(selection)) {
    const range = before(editor, unit);
    if (range) {
      const { offset } = range.anchor;
      return matchesForRange(expression, editor, range, offset);
    }
  }
  return [];
};

const searchAfter = (
  expression: MatchExpression,
  editor: ReactEditor,
  unit: Unit
): MatchResult[] => {
  const { selection } = editor;
  if (selection && Range.isCollapsed(selection)) {
    const range = after(editor, unit);
    if (range) {
      const { offset } = range.anchor;
      return matchesForRange(expression, editor, range, offset);
    }
  }
  return [];
};

const matchesForRange = (
  expression: MatchExpression,
  editor: ReactEditor,
  range: Range,
  start: number
): MatchResult[] => {
  const text = Editor.string(editor, range);
  const { path } = range.focus;
  return findMatchIndices(expression, text).map((match) => {
    const { offsets, regexMatch } = match;
    const result: MatchResult = {
      range: {
        anchor: { path, offset: start + offsets[0] },
        focus: { path, offset: start + offsets[1] },
      },
      regexMatch,
    };
    return result;
  });
};

const findMatchIndices = (expression: MatchExpression, text: string) => {
  if (typeof expression === "string") {
    return findString(expression as string, text);
  } else {
    return findRegex(expression as RegExp, text);
  }
};

const findString = (search: string, text: string) => {
  const matches: { offsets: number[]; regexMatch?: RegExpMatchArray }[] = [];
  let index = 0;
  while (index !== -1) {
    index = text.indexOf(search, index);
    if (index > -1) {
      const end = index + search.length;
      matches.push({ offsets: [index, end] });
      index = end;
    }
  }
  return matches;
};

const findRegex = (search: RegExp, text: string) => {
  const matches: { offsets: number[]; regexMatch: RegExpMatchArray }[] = [];
  let match: RegExpExecArray | null;
  const globalSearch = new RegExp(search, "g");
  while ((match = globalSearch.exec(text)) !== null) {
    matches.push({
      offsets: [match.index, match.index + match[0].length],
      regexMatch: match,
    });
  }
  return matches;
};

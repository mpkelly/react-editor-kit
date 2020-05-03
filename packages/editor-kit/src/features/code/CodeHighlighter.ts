import Prism from "prismjs";
import { Range, Node, NodeEntry } from "slate";
import { Languages } from "./Languages";
Prism.highlightAll();

export const highlightCode = ([node, path]: NodeEntry, language: string) => {
  const ranges: Range[] = [];
  let offset = 0;
  let string = Node.string(node);
  const grammar = Prism.languages[Languages[language]];
  const tokens = Prism.tokenize(string, grammar);
  for (const token of tokens) {
    if (typeof token === "string") {
      offset += token.length;
      continue;
    }
    const text = getContent(token);
    offset += text.length;
    ranges.push({
      anchor: { path, offset: offset - text.length },
      focus: { path, offset: offset },
      codeRange: true,
      type: token.type
    });
  }
  return ranges;
};

export const getContent = (token: any) => {
  if (typeof token === "string") {
    return token;
  } else if (typeof token.content === "string") {
    return token.content;
  } else {
    return token.content.map(getContent).join("");
  }
};

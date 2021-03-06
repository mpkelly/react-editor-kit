import React from "react";
import { Range, Transforms, Element, Node, Editor, Path, Point } from "slate";
import { ReactEditor } from "slate-react";
import { PluginAction } from "../../plugins/PluginAction";
import { toggleMark } from "../marks/Marks";
import { getActiveNode } from "../../editor/Editor";

export const InitialLetterPluginAction: PluginAction = {
  action: ({ editor, element }) => {
    const range = findInitialLetterRange(editor);
    if (range) {
      Transforms.setSelection(editor, range);
      toggleMark(editor, "initial-letter");
      Transforms.collapse(editor, { edge: "end" });
    } else {
      if (element) {
        const child = element.children.find(
          (text: Node) => text["initial-letter"]
        );
        if (child) {
          Transforms.setNodes(
            editor,
            { ["initial-letter"]: undefined },
            { at: ReactEditor.findPath(editor, child) }
          );
        }
      }
    }
  },
  isActionActive: ({ editor }) => isInitialLetterActive(editor),
};

export const isInitialLetterActive = (editor: ReactEditor) => {
  const range = findInitialLetterRange(editor);
  if (range) {
    const [node] = Editor.node(editor, range);
    return node["initial-letter"];
  }
  return false;
};

export const findInitialLetterRange = (editor: ReactEditor): Range | null => {
  const { selection } = editor;
  const element = getActiveNode(editor);

  if (!element || element.type !== "paragraph") {
    return null;
  }

  if (!selection) {
    return null;
  }

  //Get the complete string which could be spread
  //over multiple children
  const blockText = Node.string(element);

  //The start offset of the Text node in it's parent - it might be after siblings
  const textOffset = getTextNodeOffset(
    element as Element,
    selection.anchor.path
  );
  const offsetInParent = textOffset + selection.anchor.offset;

  // Find the first line break before the selection, if there is one, to use are our
  // start location - the target char must come after this point
  let startOffset = blockText.substring(0, offsetInParent).lastIndexOf("\n");
  if (startOffset == -1) {
    startOffset = 0;
  }

  // Find the first non-empty char, if there is one
  const tagretChar = blockText.substring(startOffset).trim().charAt(0);

  // The target area might be just whitespace so return early
  if (!tagretChar) {
    return null;
  }

  // Move our start offset forward to our target char, accounting for any
  // whitespace including multiple breaks
  startOffset = blockText.indexOf(tagretChar, startOffset);

  const point = pointOf(tagretChar, startOffset, element as Element);
  const path = selection.focus.path.slice();
  path.pop();
  path.push(point.path);
  return {
    anchor: {
      path,
      offset: point.offset,
    },
    focus: { path, offset: point.offset + 1 },
  };
};

const getTextNodeOffset = (element: Element, childPath: Path) => {
  const childIndex = childPath[childPath.length - 1];
  let offset = 0;
  element.children
    .filter((child: Node, index: number) => index < childIndex)
    .forEach((node) => {
      offset += Node.string(node).length;
    });
  return offset;
};

// Find the point - path + offset - of the target char. This will be on
// a text node in the parent paragraph.
const pointOf = (char: string, start: number, element: Element) => {
  let position = 0;
  let offset = 0;
  let text: Node | null = null;
  for (let child of element.children) {
    let childText = Node.string(child);
    if (position + childText.length <= start) {
      position += childText.length;
      continue;
    }
    offset = childText.indexOf(char, start - position);
    text = child;
    break;
  }
  const path = element.children.indexOf(text as Node);
  return { path, offset };
};

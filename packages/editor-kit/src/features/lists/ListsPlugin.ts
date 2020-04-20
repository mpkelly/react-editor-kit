import { Transforms, Editor, Node, Element } from "slate";
import { Plugin, Trigger } from "../../plugins/Plugin";
import { RenderElementProps, ReactEditor } from "slate-react";
import { renderElement } from "../elements/ElementRenderer";
import { isNodeActive, isBlockEmpty } from "../blocks/Blocks";
import { MatchResult } from "../../editor/Matching";
import {
  deleteBackward,
  getActiveNode,
  getAncestor,
} from "../../editor/Editor";

const createPlugin = (
  type: string,
  reactType: string,
  triggers: Trigger[]
): Plugin => {
  return {
    triggers,
    withPlugin: (editor) => {
      const { normalizeNode } = editor;
      editor.normalizeNode = ([node, path]) => {
        if (node.type === "list-item") {
          const [parent] = Editor.parent(editor, path);
          if (
            parent &&
            parent.type !== "ordered-list" &&
            parent.type !== "unordered-list"
          ) {
            Transforms.setNodes(editor, { type: "paragraph" }, { at: path });
          }
        }
        return normalizeNode([node, path]);
      };
      return editor;
    },
    onTrigger: (editor: ReactEditor, match: MatchResult[]) => {
      if (!editor.isNodeSupported(type)) {
        return;
      }
      if (isNodeActive(editor, type)) {
        return;
      }
      if (match.length && match[0].regexMatch) {
        deleteBackward(editor, match[0].regexMatch[0].length);
      }
      toggleList(editor, type);
    },
    renderElement: (props: RenderElementProps) => {
      const { element } = props;
      switch (element.type) {
        case type:
          return renderElement(props, type, reactType);
        default:
          return renderElement(props, "list-item", "li");
      }
    },
    onKeyDown: (
      event: React.KeyboardEvent<HTMLElement>,
      editor: ReactEditor
    ) => {
      if (!isNodeActive(editor, "list-item")) {
        return false;
      }
      const active = getActiveNode(editor);
      let ancestor = getAncestor(editor, active as Element, 1);

      if (!ancestor || ancestor!.type !== type) {
        return false;
      }
      if (event.keyCode === 13) {
        if (event.shiftKey) {
          event.preventDefault();
          editor.insertText("\n");
          return true;
        }
        return handleEnter(editor, event);
      }
      if (event.keyCode === 9) {
        return handleTab(editor, event, type);
      }
      return false;
    },
    editorStyles: () => EditorStyle,
  };
};

export const OrderedListPlugin = createPlugin("ordered-list", "ol", [
  { pattern: /^\s?[0-9]+\.\s/, range: "block" },
]);

export const UnorderedListPlugin = createPlugin("unordered-list", "ul", [
  { pattern: /^\s?\*\s/g, range: "block" },
]);

export const toggleOrderedList = (editor: ReactEditor) => {
  const active = getActiveNode(editor);
  const parent = getAncestor(editor, active as Element, 1);
  if (parent && parent.type == "unordered-list") {
    Transforms.setNodes(
      editor,
      { type: "ordered-list", children: [] },
      { at: ReactEditor.findPath(editor, parent) }
    );
  } else {
    return toggleList(editor, "ordered-list");
  }
};

export const toggleUnorderedList = (editor: ReactEditor) => {
  const active = getActiveNode(editor);
  const parent = getAncestor(editor, active as Element, 1);
  if (parent && parent.type == "ordered-list") {
    Transforms.setNodes(
      editor,
      { type: "unordered-list", children: [] },
      { at: ReactEditor.findPath(editor, parent) }
    );
  } else {
    return toggleList(editor, "unordered-list");
  }
};

const handleEnter = (
  editor: ReactEditor,
  event: React.KeyboardEvent<HTMLElement>
) => {
  event.preventDefault();
  //1. Current list item has content, so add a new one
  if (!isBlockEmpty(editor)) {
    Editor.withoutNormalizing(editor, () => {
      Transforms.insertNodes(editor, {
        type: "list-item",
        children: [{ text: "" }],
      });
    });
  } else {
    const active = getActiveNode(editor);
    if (!active) {
      return false;
    }
    const list = getAncestor(editor, active, 1) as Element;
    const listParent = getAncestor(editor, active, 2);

    if (listParent && listParent.children[0].type === "list-item") {
      //2. If nested then unwrap and move left
      Transforms.unwrapNodes(editor, {
        match: (n) => n.type === list.type,
        split: true,
      });
    } else {
      //3. At top level so cannot unwrap, insert new paragraph and break from list
      toggleList(editor, list.type);
    }
  }
  return true;
};

const handleTab = (
  editor: ReactEditor,
  event: React.KeyboardEvent<HTMLElement>,
  type: string
) => {
  //Handle
  const active = getActiveNode(editor);

  if (event.shiftKey) {
    let ancestor = getAncestor(editor, active as Element, 2);
    // 1. tab+shift = move left to grandparent list if nested
    if (ancestor?.children.find((child) => child.type === "list-item")) {
      Transforms.liftNodes(editor);
    } else {
      const options = {
        at: ReactEditor.findPath(editor, active as Element),
      };
      // 2. tab+shift = unwrap and move to below parent if no grandparent list
      if (active?.children.length == 1) {
        Transforms.setNodes(editor, { type: "paragraph" }, options);
      } else {
        Transforms.unwrapNodes(editor, options);
      }
    }
    event.preventDefault();
    return true;
  }

  const ancestor = getAncestor(editor, active as Element, 1);
  if (!ancestor) {
    return false;
  }

  if (ancestor.children.length > 1) {
    event.preventDefault();
    const index = ancestor?.children.indexOf(active as Node) - 1;
    if (ancestor.children[index].type !== "list-item") {
      // 3a. tab = move right. If the node above is a list then append to it.
      const otherList = ancestor.children[index];
      const destination = ReactEditor.findPath(
        editor,
        otherList.children[otherList.children.length - 1]
      );
      destination[destination.length - 1]++;
      Transforms.moveNodes(editor, {
        to: destination,
      });
    } else {
      // 3b. otherwise, wrap the item in a new list and nest in parent
      Transforms.wrapNodes(editor, { type, children: [] });
    }
    return true;
  }
  return false;
};

const toggleList = (editor: ReactEditor, type: string) => {
  const isActive = isNodeActive(editor, type);

  Transforms.unwrapNodes(editor, {
    match: (n) => n.type === type,
    split: true,
  });

  Editor.withoutNormalizing(editor, () => {
    Transforms.setNodes(editor, {
      type: isActive ? "paragraph" : "list-item",
    });

    if (!isActive) {
      const list = { type, children: [] };
      Transforms.wrapNodes(editor, list);
    }
  });
};

const EditorStyle = `
  ul ul ul ul,
  ul {
    list-style: square outside none;
  }

  ul ul ul ul ul,
  ul ul {
    list-style: circle outside none;
  }

  ul ul ul ul ul ul,
  ul ul ul {
    list-style: disc outside none;
  }

  ol ol ol ol, 
  ol {
    list-style: decimal outside none;
  }

  ol ol ol ol ol,
  ol ol {
    list-style: lower-latin outside none;
  }

  ol ol ol ol ol ol,
  ol ol ol {
    list-style: lower-roman outside none;
  }
`;

import { Transforms, Editor, Point } from "slate";
import { Plugin, Trigger } from "../../plugins/Plugin";
import { RenderElementProps, ReactEditor } from "slate-react";
import { renderElement } from "../elements/ElementRenderer";
import { isNodeActive, isBlockEmpty } from "../blocks/Blocks";
import { MatchResult } from "../../editor/Matching";
import { deleteBackward, getActiveNode } from "../../editor/Editor";

const createPlugin = (
  type: string,
  reactType: string,
  triggers: Trigger[]
): Plugin => {
  return {
    triggers,
    withPlugin: editor => {
      const { normalizeNode } = editor;
      editor.normalizeNode = ([node, path]) => {
        if (path.length > 1) {
          const parent = Editor.parent(editor, path);
          if (parent) {
            const parentType = parent[0].type;
            if (
              parentType == type &&
              node.type !== "list-item" &&
              node.type !== type
            ) {
              Transforms.liftNodes(editor, {
                at: path
              });
            }
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

      Transforms.unwrapNodes(editor, {
        match: n => n.type === type,
        split: true
      });

      Transforms.setNodes(editor, {
        type: "list-item"
      });
      const block = { type, children: [] };
      Transforms.wrapNodes(editor, block);
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
      if (!isNodeActive(editor, type)) {
        return false;
      }
      if (!isNodeActive(editor, "list-item")) {
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
    editorStyles: () => EditorStyle
  };
};

export const OrderedListPlugin = createPlugin("ordered-list", "ol", [
  { pattern: /^\s?[0-9]+\.\s/, range: "block" }
]);

export const UnorderedListPlugin = createPlugin("unordered-list", "ul", [
  { pattern: /^\s?\*\s/g, range: "block" }
]);

export const toggleOrderedList = (editor: ReactEditor) => {
  return toggleList(editor, "ordered-list");
};

export const toggleUnorderedList = (editor: ReactEditor) => {
  return toggleList(editor, "unordered-list");
};

const handleEnter = (
  editor: ReactEditor,
  event: React.KeyboardEvent<HTMLElement>
) => {
  event.preventDefault();
  if (!isBlockEmpty(editor)) {
    Editor.withoutNormalizing(editor, () => {
      Transforms.insertNodes(editor, {
        type: "list-item",
        children: [{ text: "" }]
      });
    });
  } else {
    const [, path] = Editor.node(editor, editor.selection?.focus as Point, {
      edge: "end"
    });
    let [, parentPath] = Editor.parent(editor, path);
    const [, listItemPath] = Editor.parent(editor, parentPath);
    const [list, listPath] = Editor.node(editor, listItemPath);
    const [listParent] = Editor.parent(editor, listPath);
    if (listParent && listParent.children[0].type === "list-item") {
      Transforms.unwrapNodes(editor, {
        match: n => n.type === list.type,
        split: true
      });
    } else {
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
  if (isBlockEmpty(editor)) {
    event.preventDefault();
    if (event.shiftKey) {
      Transforms.unwrapNodes(editor, {
        match: n => n.type === type,
        split: true
      });
    } else {
      const active = getActiveNode(editor);
      if (active) {
        const parent = Editor.parent(
          editor,
          ReactEditor.findPath(editor, active)
        );
        if (parent && parent[0].children.length > 1) {
          const node = parent[0];
          if (
            node.children.length > 2 &&
            node.children[node.children.length - 2].type === type
          ) {
            const at = ReactEditor.findPath(editor, active);
            const children = node.children[node.children.length - 2].children;
            const lastChildPath = ReactEditor.findPath(
              editor,
              children[children.length - 1]
            );
            lastChildPath[lastChildPath.length - 1]++;
            Transforms.moveNodes(editor, { at, to: lastChildPath });
          } else {
            const block = { type, children: [] };
            Transforms.wrapNodes(editor, block);
          }
        }
      }
    }
    return true;
  }
  return false;
};

const toggleList = (editor: ReactEditor, type: string) => {
  const isActive = isNodeActive(editor, type);

  Transforms.unwrapNodes(editor, {
    match: n => n.type === type,
    split: true
  });

  Editor.withoutNormalizing(editor, () => {
    Transforms.setNodes(editor, {
      type: isActive ? "paragraph" : "list-item"
    });

    if (!isActive) {
      const block = { type, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  });
};

const EditorStyle = `
  ul, ol {
    display:inline-block;
  }
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

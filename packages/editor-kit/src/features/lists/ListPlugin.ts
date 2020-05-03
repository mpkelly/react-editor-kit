import { Transforms, Editor, Node, Element } from "slate";
import { Plugin } from "../../plugins/Plugin";
import { RenderElementProps, ReactEditor } from "slate-react";
import { renderElement } from "../elements/ElementRenderer";
import { isElementActive, isElementEmpty } from "../blocks/Elements";
import { ListPluginAction } from "./ListPluginAction";
import { Trigger } from "../../plugins/Trigger";
import { ListEnterKeyHandler } from "./ListEnterKeyHandler";
import { ListTabKeyHandler } from "./ListTabKeyHandler";

export const createListPlugin = (
  type: string,
  reactType: string,
  triggers: Trigger[],
  editorStyle: string
): Plugin => {
  return {
    name: type,
    triggers,
    actions: [ListPluginAction],
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
    renderElement: (props: RenderElementProps) => {
      const { element } = props;
      switch (element.type) {
        case type:
          return renderElement(props, type, reactType);
        default:
          return renderElement(props, "list-item", "li");
      }
    },
    onKey: [ListEnterKeyHandler, ListTabKeyHandler],
    editorStyle,
  };
};

export const toggleList = (editor: ReactEditor, type: string) => {
  const isActive = isElementActive(editor, type);

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

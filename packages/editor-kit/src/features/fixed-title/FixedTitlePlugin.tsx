import * as React from "react";
import { Plugin } from "../../plugins/Plugin";
import { Transforms, Node } from "slate";
import { RenderElementProps, ReactEditor } from "slate-react";
import { getActiveNode } from "../../editor/Editor";

export const createFixedBlock = (text = "") => ({
  type: "fixed-title",
  children: [{ text }],
});

export const createFixedTitlePlugin = (
  placeholder = "Enter a title"
): Plugin => {
  return {
    withPlugin: (editor) => {
      const { normalizeNode } = editor;
      editor.normalizeNode = (node) => {
        if (
          !editor.children.length ||
          editor.children[0].type !== "fixed-title"
        ) {
          Transforms.insertNodes(editor, createFixedBlock(), { at: [0] });
        }
        return normalizeNode(node);
      };
      return editor;
    },
    renderElement: (props: RenderElementProps) => {
      if (props.element.type === "fixed-title") {
        return <FixedTitle {...props} placeholder={placeholder} />;
      }
      return undefined;
    },
    onKeyDown: (event: React.KeyboardEvent, editor: ReactEditor) => {
      const node = getActiveNode(editor);
      if (!node || node.type !== "fixed-title") {
        return false;
      }
      return handleEnter(editor, event);
    },
    editorStyles: () => `  
      .rek-fixed-title.rek-empty:before {
        content: attr(placeholder);
        opacity:0.2;
        position:absolute;
        display: block; /* For Firefox */
      }
    `,
  };
};

export interface FixedTitleProps extends RenderElementProps {
  placeholder: string;
}

export const FixedTitle = (props: FixedTitleProps) => {
  const { element, attributes, children, placeholder } = props;
  const isEmpty = Node.string(element).length === 0;
  let className = "rek-fixed-title";
  if (isEmpty) {
    className = className + " rek-empty";
  }
  return (
    <h1 {...attributes} className={className} placeholder={placeholder}>
      {children}
    </h1>
  );
};

// Don't allow the block to split (duplicated) on enter which is the default behaviour
export const handleEnter = (
  editor: ReactEditor,
  event: React.KeyboardEvent
) => {
  if (event.keyCode === 13) {
    Transforms.insertNodes(editor, {
      type: "paragraph",
      children: [{ text: "" }],
    });
    event.preventDefault();
    return true;
  }
  return false;
};

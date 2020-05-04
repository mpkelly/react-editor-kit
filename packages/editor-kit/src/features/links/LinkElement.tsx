import React, { Fragment, useState, useCallback } from "react";
import { Node, Transforms, Range, Editor } from "slate";
import { RenderElementProps, ReactEditor } from "slate-react";
import { Tooltip } from "../popup/Tooltip";
import { FocusPopup } from "../popup/FocusPopup";
import { LinkToolbar } from "./LinkToolbar";
import { ModalPopup } from "../popup/ElementModalPopup";
import { LinkEditor, LinkModel } from "./LinkEditor";
import { useEditorKit } from "../../editor/EditorKit";
import { Show } from "../../ui/Show";
import { isElementActive } from "../elements/Elements";

export interface LinkProps extends RenderElementProps {}

export const Link = (props: LinkProps) => {
  const { element, attributes, children } = props;
  const { editor } = useEditorKit();
  const [editing, setEditing] = useState(element.editing);
  const displayName = Node.string(element);
  const [link, setLink] = useState<LinkModel>({
    url: element.url,
    displayName,
  });

  const handleEditLink = useCallback(() => {
    Transforms.setNodes(
      editor,
      { editing: true },
      { at: ReactEditor.findPath(editor, element) }
    );
    setEditing(true);
  }, [element]);

  const handleFinishEditing = useCallback(() => {
    const point = Editor.before(editor, ReactEditor.findPath(editor, element));
    let childProps: any = {};
    if (element.children.length === 1) {
      //Copy style props fromc child to maintain text styles like fontSize etc
      const { text, ...rest } = element.children[0];
      childProps = rest;
    }
    Transforms.removeNodes(editor, {
      at: ReactEditor.findPath(editor, element),
    });
    Transforms.insertNodes(
      editor,
      {
        type: "link",
        editing: false,
        url: link.url,
        children: [{ text: link.displayName, ...childProps }],
      },
      { at: point }
    );
    setEditing(false);
  }, [element, link]);

  return (
    <Fragment>
      <Show when={!editing}>
        <Tooltip node={element} tooltipText={element.url} />

        <FocusPopup element={element} fixed>
          <LinkToolbar element={element} onEditLink={handleEditLink} />
        </FocusPopup>
      </Show>

      <ModalPopup
        element={element}
        show={editing}
        onClickOutside={handleFinishEditing}
      >
        <LinkEditor link={link} onLinkChange={setLink} />
      </ModalPopup>

      <a {...attributes} href={element.url}>
        {children}
      </a>
    </Fragment>
  );
};

export const createLink = (editor: ReactEditor) => {
  if (isElementActive(editor, "link")) {
    const [] = Editor.nodes(editor, {
      match: (n) => n.type === "link",
    });
    Transforms.setNodes(
      editor,
      { editing: true },
      { at: editor.selection as Range }
    );
  } else {
    const { selection } = editor;
    const isExpanded = selection && Range.isExpanded(selection);
    const link = {
      type: "link",
      url: "",
      editing: true,
      children: isExpanded ? [] : [{ text: "" }],
    };

    if (isExpanded) {
      //Track bug https://github.com/ianstormtaylor/slate/issues/3454
      (Transforms.wrapNodes as any)(editor, link, {
        at: selection as Range,
        split: true,
        hanging: false,
      });
      Transforms.collapse(editor, { edge: "end" });
    } else {
      Transforms.insertNodes(editor, link);
    }
  }
};

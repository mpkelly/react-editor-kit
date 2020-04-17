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
import { isNodeActive } from "../blocks/Blocks";

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

  const handleLinkChange = useCallback((link: LinkModel) => {
    setLink(link);
  }, []);

  const handleEditLink = useCallback(() => {
    setEditing(true);
  }, []);

  const handleFinishEditing = useCallback(() => {
    setEditing(false);
    if (link.displayName && link.url) {
      updateLink(editor, element, link);
    }
  }, [link]);

  return (
    <Fragment>
      <Show when={!editing}>
        <Tooltip element={element} text={element.url} />

        <FocusPopup element={element} fixed>
          <LinkToolbar element={element} onEditLink={handleEditLink} />
        </FocusPopup>
      </Show>

      <ModalPopup
        element={element}
        show={editing}
        onClickOutside={handleFinishEditing}
      >
        <LinkEditor link={link} onLinkChange={handleLinkChange} />
      </ModalPopup>

      <a {...attributes} href={element.url}>
        {children}
      </a>
    </Fragment>
  );
};

const updateLink = (editor: ReactEditor, element: Node, link: LinkModel) => {
  const node = {
    type: "link",
    url: link.url,
    children: [{ text: link.displayName }],
  };
  Transforms.setNodes(editor, node);
};

export const createLink = (editor: ReactEditor) => {
  if (isNodeActive(editor, "link")) {
    const [] = Editor.nodes(editor, {
      match: (n) => n.type === "link",
    });
    Transforms.setNodes(editor, { editing: true });
  } else {
    const { selection } = editor;
    const isCollapsed = selection && Range.isCollapsed(selection);
    const link = {
      type: "link",
      url: "",
      editing: true,
      children: isCollapsed ? [{ text: "" }] : [],
    };
    if (isCollapsed) {
      Transforms.insertNodes(editor, link);
    } else {
      //Track bug https://github.com/ianstormtaylor/slate/issues/3454
      (Transforms.wrapNodes as any)(editor, link, {
        at: (selection as Range).focus,
        split: true,
        hanging: false,
      });
      Transforms.collapse(editor, { edge: "end" });
    }
  }
};

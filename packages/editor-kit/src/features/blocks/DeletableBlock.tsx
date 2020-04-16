import React, { useCallback } from "react";
import { RenderElementProps } from "slate-react";
import { BlockWrapper } from "./BlockWrapper";
import { IconProvider } from "../icons/IconProviderPlugin";
import { usePlugin } from "../../plugins/usePlugin";
import { Icon } from "../icons/Icon";
import { useEdit } from "../../editor/Edit";
import { Transforms } from "slate";
import { useEditorKit } from "../../editor/EditorKit";
import { Resizable } from "../resizable/Resizable";

export interface DeletableBlockProps extends RenderElementProps {
  className?: string;
  toolbarContent?: JSX.Element | JSX.Element[];
}

export const DeletableBlock = (props: DeletableBlockProps) => {
  let { children, element, className, toolbarContent, ...rest } = props;
  className = className || "";
  const { deleteNode } = useEdit();
  const { editor } = useEditorKit();
  const handleDelete = useCallback(() => {
    deleteNode(props.element);
  }, []);
  const handleWidthChange = (width: number) => {
    Transforms.setNodes(
      editor,
      { width },
      { match: (node) => node === element }
    );
  };
  return (
    <BlockWrapper
      className={`deletable ${className}`}
      focusToolbar={toolbarContent || <Toolbar onDelete={handleDelete} />}
      element={element}
      {...rest}
    >
      {children}
    </BlockWrapper>
  );
};

export interface ToolbarProps {
  onDelete(): void;
}

export const Toolbar = (props: ToolbarProps) => {
  const { onDelete } = props;
  const { data } = usePlugin("icon-provider") as IconProvider;
  return <Icon icon={data.delete} onClick={onDelete} />;
};

import React, { useCallback } from "react";
import { RenderElementProps } from "slate-react";
import { BlockWrapper } from "./BlockWrapper";
import { IconProvider } from "../icons/IconProviderPlugin";
import { usePlugin } from "../../plugins/usePlugin";
import { Icon } from "../icons/Icon";
import { useEdit } from "../../editor/Edit";

export interface DeletableBlockProps extends RenderElementProps {
  className?: string;
  toolbarContent?: JSX.Element | JSX.Element[];
}

export const DeletableBlock = (props: DeletableBlockProps) => {
  const className = props.className || "";
  const { deleteNode } = useEdit();
  const handleDelete = useCallback(() => {
    deleteNode(props.element);
  }, []);
  return (
    <BlockWrapper
      className={`deletable ${className}`}
      focusToolbar={<Toolbar onDelete={handleDelete} />}
      {...props}
    />
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

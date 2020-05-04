import React, { useCallback } from "react";
import { RenderElementProps, ReactEditor } from "slate-react";
import { ElementWrapper } from "./BlockWrapper";
import { IconProvider } from "../icons/IconProviderPlugin";
import { usePlugin } from "../../plugins/usePlugin";
import { Icon } from "../icons/Icon";
import { Transforms } from "slate";
import { useEditorKit } from "../../editor/EditorKit";
import { Resizable } from "../resizable/Resizable";

export interface DeletableElementProps extends RenderElementProps {
  className?: string;
  toolbarContent?: JSX.Element | JSX.Element[];
}

export const DeletableElement = (props: DeletableElementProps) => {
  let { children, element, className, toolbarContent, ...rest } = props;
  className = className || "";
  const { editor } = useEditorKit();

  const handleDelete = useCallback(() => {
    Transforms.delete(editor, { at: ReactEditor.findPath(editor, element) });
  }, [element]);

  const handleWidthChange = useCallback(
    (resizedWidth: number) => {
      Transforms.setNodes(
        editor,
        { resizedWidth },
        { at: ReactEditor.findPath(editor, element) }
      );
    },
    [element]
  );

  return (
    <ElementWrapper
      className={`deletable ${className}`}
      focusToolbar={toolbarContent || <Toolbar onDelete={handleDelete} />}
      element={element}
      {...rest}
    >
      <Resizable
        initialWidth={element.resizedWidth || "100%"}
        onChange={handleWidthChange}
      >
        {children}
      </Resizable>
    </ElementWrapper>
  );
};

interface ToolbarProps {
  onDelete(): void;
}

const Toolbar = (props: ToolbarProps) => {
  const { onDelete } = props;
  const { icons } = usePlugin<IconProvider>("icon-provider");
  return <Icon icon={icons.delete} onMouseDown={onDelete} />;
};

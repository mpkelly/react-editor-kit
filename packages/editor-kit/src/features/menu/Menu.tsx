import React, { CSSProperties, useState, useCallback, ReactNode } from "react";
import { ReactEditor } from "slate-react";
import { EditorIcon, Icon } from "../icons/Icon";
import { usePlugin } from "../../plugins/usePlugin";
import { Labels, EditorLabels } from "../i18n/LabelsPlugin";
import { useEditorKit } from "../../editor/EditorKit";
import { block } from "../../ui/Utils";
import { IconProvider } from "../icons/IconProviderPlugin";
import { Show } from "../../ui/Show";
import { getPosition } from "../popup/Popups";

export interface MenuItem {
  icon?: EditorIcon | ReactNode;
  text?: string;
  labelKey?: keyof EditorLabels;
  rightText?: string;
  rightLabelKey?: keyof EditorLabels;
  group?: string;
  items?: MenuItem[];
  onClick(editor: ReactEditor): void;
}

export interface MenuProps {
  items: MenuItem[];
  style?: CSSProperties;
}

export const Menu = React.forwardRef((props: MenuProps, ref: any) => {
  const { items, style } = props;
  const children: ReactNode[] = [];
  let lastGroup: string | undefined = undefined;
  items.forEach((item, index) => {
    children.push(<MenuItem {...item} />);
    if (index + 1 < items.length && item.group !== lastGroup) {
      children.push(<div className="rek-menu-divider" />);
    }
    lastGroup = item.group;
  });
  return (
    <div className="rek-panel rek-list rek-menu" ref={ref} style={style}>
      {children}
    </div>
  );
});

export const MenuItem = (props: MenuItem) => {
  let {
    icon,
    text,
    labelKey,
    rightText,
    rightLabelKey,
    items,
    onClick,
  } = props;
  const { data: labels } = usePlugin("labels") as Labels;
  const { data: icons } = usePlugin("icon-provider") as IconProvider;
  const { editor } = useEditorKit();
  const [element, setElement] = useState<HTMLElement>();
  const [childMenuElement, setChildMenuElement] = useState<HTMLElement>();

  if (labelKey) {
    text = labels[labelKey];
  }

  if (rightLabelKey) {
    rightText = labels[rightLabelKey];
  }

  const handleNestedRef = useCallback(
    (node: HTMLElement) => {
      setChildMenuElement(node);
    },
    [childMenuElement]
  );

  const handleMouseEnter = (event: React.MouseEvent) => {
    setElement(event.currentTarget as HTMLElement);
  };

  const handleMouseLeave = () => {
    setElement(undefined);
  };
  let style: CSSProperties = {};

  if (element && childMenuElement) {
    const anchor = element.getBoundingClientRect();
    const bounds = childMenuElement.getBoundingClientRect();
    style = getPosition(bounds, anchor, "auto", false, { v: 0 });
  }

  return (
    <div
      className="rek-menu-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={(event) => {
        block(event);
        onClick(editor);
      }}
    >
      <div className="rek-menu-item-icon">{icon && <Icon icon={icon} />}</div>
      <span className="rek-menu-item-text rek-text">{text}</span>
      <div className="rek-menu-item-right">
        {rightText && <span>{rightText}</span>}
      </div>
      <Show when={items && items?.length > 0}>{icons.dropdownIcon}</Show>
      <Show when={Boolean(element)}>
        <Menu items={items || []} ref={handleNestedRef} style={style} />
      </Show>
    </div>
  );
};

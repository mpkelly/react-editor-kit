import React, { Fragment, useCallback, useState } from "react";
import { ActionChildProps } from "../actions/Action";
import { Tooltip, TooltipContentProps } from "../popup/Tooltip";
import { Show } from "../../ui/Show";
import { Icon, EditorIcon } from "../icons/Icon";

export interface IconProps extends TooltipContentProps {
  className?: string;
  ligature?: string;
  icon?: EditorIcon;
  onRef?(node?: HTMLElement | null): void;
}

export interface IconButtonProps extends ActionChildProps, IconProps {}

export const IconButton = (props: IconButtonProps) => {
  const {
    active,
    onMouseDown,
    icon,
    className,
    ligature,
    disabled,
    tooltipText,
    tooltipComponent,
    tooltipLocation,
    tooltipOffsets,
    onRef,
    ...rest
  } = props;
  const activeClass = active ? "active" : "";
  const disabledClass = disabled ? "rek-disabled" : "";
  const clazz = `rek-icon-button rek-icon ${className} ${activeClass} ${disabledClass}`;
  const [element, setElement] = useState<HTMLElement>();

  const handleRef = useCallback(
    (node?: HTMLElement | null) => {
      if (node && node != element) {
        setElement(node);
      }
      onRef && onRef(node);
    },
    [element]
  );
  const hasTooltip = tooltipText || tooltipComponent;

  const editorIcon: EditorIcon = icon
    ? icon
    : ({ className, ligature } as EditorIcon);

  return (
    <Fragment>
      <Show when={element && hasTooltip}>
        <Tooltip
          element={element}
          tooltipText={tooltipText}
          tooltipComponent={tooltipComponent}
          tooltipLocation={tooltipLocation}
          tooltipOffsets={tooltipOffsets}
        />
      </Show>
      <Icon
        icon={editorIcon}
        className={clazz}
        onMouseDown={onMouseDown}
        ref={handleRef}
        {...rest}
      />
    </Fragment>
  );
};

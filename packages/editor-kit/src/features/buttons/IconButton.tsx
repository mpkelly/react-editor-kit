import React, {
  useRef,
  Fragment,
  useCallback,
  useState,
  RefObject,
  Ref,
} from "react";
import { ActionChildProps } from "../actions/Action";
import { Tooltip, TooltipContentProps } from "../popup/Tooltip";
import { Show } from "../../ui/Show";

export interface IconProps extends TooltipContentProps {
  className: string;
  ligature?: string;
  onRef?(node?: HTMLElement | null): void;
}

export interface IconButtonProps extends ActionChildProps, IconProps {}

export const IconButton = (props: IconButtonProps) => {
  const {
    active,
    onMouseDown,
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
  const clazz = `rek-icon-button rek-icon rek-css-icon ${className} ${activeClass} ${disabledClass}`;
  const [element, setElement] = useState<HTMLElement>();

  const handleRef = useCallback(
    (node?: HTMLElement | null) => {
      if (node && !element) {
        setElement(node);
      }
      onRef && onRef(node);
    },
    [element]
  );
  const hasTooltip = tooltipText || tooltipComponent;

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
      <span
        className={clazz}
        onMouseDown={onMouseDown}
        ref={handleRef}
        {...rest}
      >
        {ligature}
      </span>
    </Fragment>
  );
};

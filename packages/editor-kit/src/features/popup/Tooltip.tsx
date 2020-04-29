import React, { ReactNode, Fragment } from "react";
import { Node } from "slate";
import { HoverPopup } from "./HoverPopup";
import { Show } from "../../ui/Show";
import { Location, Offsets } from "./Popups";

export interface TooltipContentProps {
  tooltipText?: string;
  tooltipComponent?: ReactNode;
  tooltipLocation?: Location;
  tooltipOffsets?: Offsets;
}

export interface TooltipProps extends TooltipContentProps {
  node?: Node;
  element?: HTMLElement;
}

export const Tooltip = (props: TooltipProps) => {
  const {
    tooltipText,
    tooltipComponent,
    element,
    node,
    tooltipLocation,
    tooltipOffsets,
  } = props;
  if (!tooltipText && !tooltipComponent) {
    return null;
  }

  return (
    <HoverPopup
      node={node}
      element={element}
      hideWhenFocusedWithin
      fixed
      location={tooltipLocation}
      offsets={tooltipOffsets}
    >
      <Fragment>
        <Show when={tooltipText}>
          <TextTooltip text={tooltipText as string} />
        </Show>
        <Show when={tooltipComponent}>{tooltipComponent}</Show>
      </Fragment>
    </HoverPopup>
  );
};

export interface TextTooltipProps {
  text: string;
}

export const TextTooltip = (props: TextTooltipProps) => {
  const { text } = props;
  return (
    <div className="rek-editor-tooltip">
      <span className="rek-text">{text}</span>
    </div>
  );
};

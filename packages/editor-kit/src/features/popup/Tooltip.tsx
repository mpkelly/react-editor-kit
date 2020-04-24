import React, { ReactNode, Fragment } from "react";
import { Node } from "slate";
import { HoverPopup } from "./HoverPopup";
import { Show } from "../../ui/Show";
import { Location } from "./Popups";

export interface ToolipContentProps {
  text?: string;
  component?: ReactNode;
  location?: Location;
}

export interface TooltipProps extends ToolipContentProps {
  element: Node;
}

export const Tooltip = (props: TooltipProps) => {
  const { text, component, element, location } = props;
  if (!text && !component) {
    return null;
  }
  return (
    <HoverPopup
      element={element}
      hideWhenFocusedWithin
      fixed
      location={location}
    >
      <Fragment>
        <Show when={text}>
          <TextTooltip text={text as string} />
        </Show>
        <Show when={component}>{component}</Show>
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

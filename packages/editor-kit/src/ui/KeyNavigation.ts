import { useState, useCallback } from "react";
import { useKeyPress } from "./KeyPress";
import { blockEvent } from "./Utils";
import { Editor } from "slate";

export const useKeyNavigation = (
  total: number,
  handleSelect: (index: number) => any,
  initialActive: number,
  enabled: boolean,
  editor: HTMLElement
) => {
  const [active, setActive] = useState(initialActive);

  const handlePrevious = useCallback(
    (event: KeyboardEvent) => {
      if (enabled) {
        blockEvent(event);
        setActive(nextState(active, -1, total));
      }
    },
    [enabled, total, active]
  );

  const handleNext = useCallback(
    (event: KeyboardEvent) => {
      if (enabled) {
        blockEvent(event);
        setActive(nextState(active, 1, total));
      }
    },
    [enabled, total, active]
  );

  const _handleSelect = useCallback(
    (event: KeyboardEvent) => {
      if (enabled) {
        blockEvent(event);
        handleSelect(active);
      }
    },
    [active, enabled, total, handleSelect]
  );

  useKeyPress({
    targetKeys: ["ArrowDown"],
    handler: handleNext,
    deps: [enabled, total, active],
    editor,
  });

  useKeyPress({
    targetKeys: ["ArrowUp"],
    handler: handlePrevious,
    deps: [enabled, total, active],
    editor,
  });

  useKeyPress({
    targetKeys: ["Enter", "Tab"],
    handler: _handleSelect,
    deps: [active, enabled, total, handleSelect],
    editor,
  });

  return { activeIndex: active, setActive };
};

const nextState = (active: number, delta: number, max: number) => {
  let next = active + delta;
  if (next == -1) {
    next = max - 1;
  } else if (next == max) {
    next = 0;
  }
  return next;
};

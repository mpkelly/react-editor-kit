import { CSSProperties } from "react";

export type Location =
  | "inside-start"
  | "inside-end"
  | "inside-top"
  | "inside-bottom"
  | "start"
  | "end"
  | "top"
  | "bottom"
  | "center"
  | "auto";

export interface Offsets {
  h?: number;
  v?: number;
}

export const getPosition = (
  bounds: ClientRect,
  anchor: ClientRect,
  location: Location = "bottom",
  fixed = false,
  offsets: Offsets = { v: 0, h: 0 }
): CSSProperties => {
  if (fixed) {
    const pos = getFixedPosition(bounds, anchor, location, offsets);
    return ensureWithinViewport({ ...pos, position: "fixed" }, bounds, anchor);
  } else {
    const pos = getAbsolutePosition(bounds, anchor, location, offsets);
    return ensureWithinViewport(
      { ...pos, position: "absolute" },
      bounds,
      anchor
    );
  }
};

export const getAbsolutePosition = (
  bounds: ClientRect,
  anchor: ClientRect,
  position: Location = "bottom",
  offsets: { h?: number; v?: number } = { v: 0, h: 0 }
): CSSProperties => {
  const voffset = offsets.v || 0;
  const hoffset = offsets.h || 0;
  const centerH = anchor.width / 2 - bounds.width / 2;
  const centerV = anchor.height / 2 - bounds.height / 2;
  const halfWidth = window.innerWidth / 2;
  const halfHeight = window.innerHeight / 2;
  switch (position) {
    case "inside-start":
      return { left: 0 + hoffset, top: 0 + voffset };
    case "inside-end":
      return {
        top: 0 + voffset,
        left: anchor.width - bounds.width - hoffset,
      };
    case "inside-top":
      return {
        top: voffset,
        left: centerH,
      };
    case "inside-bottom":
      return {
        top: anchor.height - voffset,
        left: centerH,
      };
    case "start":
      return {
        top: voffset,
        left: -(bounds.width + hoffset),
      };
    case "end":
      return {
        top: voffset,
        left: anchor.width + hoffset,
      };
    case "top":
      return {
        top: -(anchor.height + voffset),
        left: centerH,
      };
    case "bottom":
      return {
        top: anchor.height + voffset,
        left: centerH,
      };
    case "center":
      return {
        top: centerV + voffset,
        left: centerH + hoffset,
      };
    case "auto":
      let left = anchor.width + hoffset;
      if (anchor.left > halfWidth) {
        left = -(bounds.width + hoffset);
      }
      let top = anchor.height + voffset;
      if (anchor.top > halfHeight) {
        top = -(anchor.height + voffset);
      }
      return {
        top,
        left,
      };
  }
};

export const getFixedPosition = (
  bounds: ClientRect,
  anchor: ClientRect,
  position: Location = "bottom",
  offsets: { h?: number; v?: number } = { v: 0, h: 0 }
): CSSProperties => {
  const centerV = anchor.top + anchor.height / 2 - bounds.height / 2;
  const centerH = anchor.left + anchor.width / 2 - bounds.width / 2;
  const voffset = offsets.v || 0;
  const hoffset = offsets.h || 0;
  const halfWidth = window.innerWidth / 2;
  const halfHeight = window.innerHeight / 2;
  switch (position) {
    case "inside-start":
      return {
        top: anchor.top + voffset,
        left: anchor.left + hoffset,
      };
    case "inside-end":
      return {
        top: anchor.top + voffset,
        left: anchor.left + anchor.width - bounds.width - hoffset,
      };
    case "inside-top":
      return {
        top: anchor.top + voffset,
        left: centerH,
      };
    case "inside-bottom":
      return {
        top: anchor.top + anchor.height - bounds.height + voffset,
        left: centerH,
      };
    case "start":
      return {
        top: anchor.top + voffset,
        left: anchor.left - bounds.width + hoffset,
      };
    case "end":
      return {
        top: anchor.top + voffset,
        left: anchor.left + anchor.width + hoffset,
      };
    case "top":
      return {
        top: anchor.top - bounds.height + voffset,
        left: centerH,
      };
    case "bottom":
      return {
        top: anchor.top + anchor.height + voffset,
        left: centerH,
      };
    case "center":
      return {
        top: centerV + voffset,
        left: centerH + hoffset,
      };
    case "auto":
      let left = anchor.left + anchor.width + hoffset;
      if (anchor.left > halfWidth) {
        left = anchor.left - bounds.width + hoffset;
      }
      let top = anchor.top + anchor.height + voffset;
      if (anchor.top > halfHeight) {
        top = anchor.top - bounds.height + voffset;
      }
      return {
        top,
        left,
      };
  }
};

const ensureWithinViewport = (
  style: CSSProperties,
  bounds: ClientRect,
  anchor: ClientRect
) => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  const fixed = toFixed(style, anchor);
  const left = Number(fixed.left);
  const top = Number(fixed.top);
  const margin = 16;

  let overflow = left;
  //Overflowing the left/start of the screen
  if (overflow < 0) {
    style.left = left + overflow * -1 + margin;
  }
  //Overflowing the right/end of the screen
  overflow = left + bounds.width - width;
  if (overflow > 0) {
    style.left = left - overflow - margin;
  }
  //Overflowing the top of the screen
  overflow = top;
  if (overflow < 0) {
    style.top = top + overflow * -1 + margin;
  }
  //Overflowing the bottom of the screen
  overflow = top + bounds.height - height;
  if (overflow > 0) {
    style.top = top - overflow - margin;
  }
  return style;
};

const toFixed = (style: CSSProperties, anchor: ClientRect) => {
  if (style.position === "fixed") {
    return style;
  } else {
    const fixed = { ...style };
    if (style.left !== undefined) {
      fixed.left = Number(style.left) + anchor.left;
    }
    if (style.top !== undefined) {
      fixed.top = Number(style.top) + anchor.top;
    }
    return fixed;
  }
};

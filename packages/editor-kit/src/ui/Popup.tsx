import React, { CSSProperties } from "react";
import { OverlayLayer } from "./Layers";

export interface PopupProps {
  onClose(event: React.MouseEvent<HTMLElement, MouseEvent>): any;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  children: React.ReactNode;
  attributes?: any;
  className?: string;
}

export const Popup = (props: PopupProps) => {
  const { onClose, top, left, children, attributes, className } = props;
  const style = { top, left };
  return (
    <Overlay onClick={onClose}>
      <div style={style} {...attributes} className={className}>
        {children}
      </div>
    </Overlay>
  );
};

export const overlayStyle: CSSProperties = {
  position: "fixed",
  zIndex: OverlayLayer,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  height: "100vh",
  width: "100vw",
};

export const Overlay = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  return <div style={overlayStyle} {...props} />;
};

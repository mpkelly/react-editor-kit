import React, { forwardRef, FunctionComponent, ReactNode } from "react";
import { stopEvent } from "../../ui/Utils";

export type EditorIcon = CssIcon | FunctionComponent | JSX.Element;

export interface CssIcon {
  className: string;
  ligature?: string;
}

export interface ReactIconProps {
  icon: EditorIcon;
  className?: string;
  onMouseDown?(event: React.MouseEvent<HTMLElement, MouseEvent>): void;
  onClick?(event: React.MouseEvent<HTMLElement, MouseEvent>): void;
}

export const Icon = forwardRef<HTMLDivElement, ReactIconProps>(
  (props: ReactIconProps, ref) => {
    const { icon, className, onClick, onMouseDown, ...rest } = props;
    const iconClassName = (icon as CssIcon).className;
    if (iconClassName) {
      return (
        <span
          className={`rek-icon ${className} ${iconClassName}`}
          children={(icon as CssIcon).ligature}
          onClick={onClick}
          onMouseDown={(event) => {
            stopEvent(event);
            onMouseDown && onMouseDown(event);
          }}
          contentEditable={false}
          data-slate-void="true"
          ref={ref}
          {...rest}
        />
      );
    }
    let body = icon;
    if (typeof icon === "function") {
      const SVG = icon;
      body = <SVG />;
    }

    return (
      <div
        ref={ref}
        onClick={onClick}
        onMouseDown={onMouseDown}
        className={`rek-icon ${className}`}
        {...rest}
      >
        {body}
      </div>
    );
  }
);

Icon.defaultProps = {
  className: "",
};

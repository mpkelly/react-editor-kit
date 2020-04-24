import React, { ReactNode } from "react";
import { stop } from "../../ui/Utils";

export type EditorIcon = CssIcon | ReactNode;

export interface CssIcon {
  className: string;
  ligature?: string;
}

export interface ReactIconProps {
  icon: EditorIcon;
  className?: string;
  onClick?(event: React.MouseEvent<HTMLElement, MouseEvent>): void;
}

export const Icon = (props: ReactIconProps) => {
  const { icon, className, onClick } = props;
  const iconClassName = (icon as CssIcon).className;
  if (iconClassName) {
    return (
      <span
        className={`rek-icon ${className} ${iconClassName}`}
        children={(icon as CssIcon).ligature}
        onClick={onClick}
        onMouseDown={stop}
        contentEditable={false}
        data-slate-void="true"
      />
    );
  }
  const reactIcon = icon as JSX.Element;
  return React.cloneElement(reactIcon, { onClick });
};

import React from "react";

export type EditorIcon = CssIcon | JSX.Element;

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
      />
    );
  }
  const reactIcon = icon as JSX.Element;
  return React.cloneElement(reactIcon, { onClick });
};

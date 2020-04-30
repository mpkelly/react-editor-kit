import React, { CSSProperties, ReactNode } from "react";

export interface MenuProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export const Menu = React.forwardRef((props: MenuProps, ref: any) => {
  const { children, className, style } = props;
  return (
    <div
      className={"rek-panel rek-list rek-menu " + className}
      ref={ref}
      style={style}
    >
      {children}
    </div>
  );
});

Menu.defaultProps = {
  className: "",
};

import React, { CSSProperties, ReactNode } from "react";

export interface MenuProps {
  children: ReactNode;
  style?: CSSProperties;
}

export const Menu = React.forwardRef((props: MenuProps, ref: any) => {
  const { children, style } = props;
  return (
    <div className="rek-panel rek-list rek-menu" ref={ref} style={style}>
      {children}
    </div>
  );
});

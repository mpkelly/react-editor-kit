import React, { CSSProperties, memo } from "react";
import { block } from "../../ui/Utils";
import { useEditorKit } from "../../editor/EditorKit";

export interface PopupContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  style?: CSSProperties;
}

export const PopupContent = memo(
  React.forwardRef((props: PopupContentProps, ref: any) => {
    const { style, children, ...rest } = props;
    const { id } = useEditorKit();
    return (
      <div
        ref={ref}
        id={`rek-${id}-floating-content`}
        className="rek-floating-content"
        style={style}
        onMouseDown={block}
        {...rest}
      >
        {children}
      </div>
    );
  })
);

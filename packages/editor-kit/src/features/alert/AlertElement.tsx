import React from "react";
import { RenderElementProps } from "slate-react";
import { Icon } from "../icons/Icon";
import { DeletableBlock } from "../blocks/DeletableBlock";
import { usePlugin } from "../../plugins/usePlugin";
import { IconProvider } from "../icons/IconProviderPlugin";
import { Icons } from "../icons/Icons";

export interface AlertElementProps extends RenderElementProps {
  icon: keyof Icons;
}

export const AlertElement = (props: AlertElementProps) => {
  const { children, attributes, icon, element, ...rest } = props;
  const { icons } = usePlugin<IconProvider>("icon-provider");
  return (
    <DeletableBlock {...props}>
      <div {...attributes} {...rest} className={`rek-alert ${element.type}`}>
        <Icon icon={icons[icon]} className={`rek-alert-icon ${element.type}`} />
        <div>{children}</div>
      </div>
    </DeletableBlock>
  );
};

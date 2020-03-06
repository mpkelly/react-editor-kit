import React from "react";
import { RenderElementProps, ReactEditor } from "slate-react";
import { Plugin } from "../../plugins/Plugin";
import { Icon } from "../icons/Icon";
import { DeletableBlock } from "../blocks/DeletableBlock";
import { usePlugin } from "../../plugins/usePlugin";
import { Icons, IconProvider } from "../icons/IconProviderPlugin";
import { toggleBlock } from "../blocks/Blocks";

export interface AlertProps extends RenderElementProps {
  iconName: keyof Icons;
}

export const Alert = (props: AlertProps) => {
  const { children, attributes, iconName, element } = props;
  const { data } = usePlugin("icon-provider") as IconProvider;
  return (
    <DeletableBlock {...props}>
      <div {...attributes} className={`rek-alert ${element.type}`}>
        <Icon
          icon={data[iconName]}
          className={`rek-alert-icon ${element.type}`}
        />
        <div>{children}</div>
      </div>
    </DeletableBlock>
  );
};

export const createAlertPlugin = (
  iconName: keyof Icons,
  alertName: string,
  iconColor: string,
  backgroundColor: string
): Plugin => {
  return {
    triggers: [{ pattern: `:${alertName}`, range: "word-before" }],
    onTrigger: (editor: ReactEditor) => {
      toggleBlock(editor, alertName);
    },
    renderElement: (props: RenderElementProps) => {
      if (props.element.type === alertName) {
        return <Alert {...props} iconName={iconName} />;
      }
    },
    editorStyles: () => {
      return `
        
        .rek-alert.${alertName} {
          display:flex;
          align-items:center;
          background-color:${backgroundColor};
          padding:8px;
          width:100%;
          div {
            flex-grow:1;
          }
        }

        .rek-alert-icon.${alertName} {
          margin-right:8px;
        }

        .rek-alert-icon.${alertName}.rek-svg-icon path {
          fill:${iconColor};
        }
      `;
    }
  };
};

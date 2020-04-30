import React, { Fragment, useState, useRef } from "react";
import { MenuProps, Menu } from "./Menu";
import { IconProps, IconButton } from "../buttons/IconButton";
import { ModalPopup } from "../popup/HTMLElementModalPopup";
import { useLastFocused } from "../../editor/LastFocusedNode";
import { useEditorKit } from "../../editor/EditorKit";

export interface MenuButtonProps
  extends IconProps,
    Omit<MenuProps, "className"> {}

export const MenuButton = (props: MenuButtonProps) => {
  const { children, style, ...rest } = props;
  const { editor } = useEditorKit();
  const [show, setShow] = useState(false);
  const element = useRef<HTMLElement | null>();
  const { node } = useLastFocused(editor);
  const enabled = editor.isNodeSupported("image", node);

  const toggleShow = () => {
    if (enabled) {
      setShow((show) => !show);
    }
  };

  return (
    <Fragment>
      <IconButton
        {...rest}
        onMouseDown={toggleShow}
        disabled={!enabled}
        onRef={(node) => (element.current = node)}
      ></IconButton>
      <ModalPopup
        element={element.current as HTMLElement}
        show={show}
        onClickOutside={toggleShow}
      >
        <Menu style={style} className={"rek-menu-button-menu"}>
          {children}
        </Menu>
      </ModalPopup>
    </Fragment>
  );
};

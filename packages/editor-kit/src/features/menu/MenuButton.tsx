import React, { Fragment, useState, useRef, FunctionComponent } from "react";
import { MenuProps, Menu } from "./Menu";
import { IconProps, IconButton } from "../buttons/IconButton";
import { ModalPopup } from "../popup/HTMLElementModalPopup";

export interface MenuButtonProps
  extends IconProps,
    Omit<MenuProps, "className"> {
  disabled?: boolean;
  menuClassName?: string;
}

export const MenuButton: FunctionComponent<MenuButtonProps> = (
  props: MenuButtonProps
) => {
  const { children, style, disabled, menuClassName, ...rest } = props;
  const [show, setShow] = useState(false);
  const element = useRef<HTMLElement | null>();

  const toggleShow = () => {
    if (!disabled) {
      setShow((show) => !show);
    }
  };

  return (
    <Fragment>
      <IconButton
        {...rest}
        onMouseDown={toggleShow}
        disabled={disabled}
        onRef={(node) => (element.current = node)}
      />
      <ModalPopup
        element={element.current as HTMLElement}
        show={show}
        onClickOutside={toggleShow}
      >
        <Menu style={style} className={"rek-menu-button-menu " + menuClassName}>
          {children}
        </Menu>
      </ModalPopup>
    </Fragment>
  );
};

MenuButton.defaultProps = {
  menuClassName: "",
};

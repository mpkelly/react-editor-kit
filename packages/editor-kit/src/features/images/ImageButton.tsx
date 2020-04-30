import React from "react";
import { MenuButtonProps, MenuButton } from "../menu/MenuButton";

export const ImageButton = (props: MenuButtonProps) => {
  return <MenuButton {...props} data-image-button />;
};

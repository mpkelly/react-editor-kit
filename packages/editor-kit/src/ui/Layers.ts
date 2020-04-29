import { MenuItem } from "../features/menu/MenuItem";

export const PopupMarkerLayer = -1;
export const EditorLayer = 1;
export const FocusedLayer = 2;
export const ResizeHandleLayer = 999;
export const OverlayLayer = 1000;
export const MenuLayer = 900;
export const MenuItemLayer = MenuLayer + 1;
export const HoverItemLayer = MenuItemLayer + 1;
export const PopupContentLayer = OverlayLayer + 1;

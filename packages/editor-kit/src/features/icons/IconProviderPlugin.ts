import { Plugin } from "../../plugins/Plugin";
import { Icons } from "./Icons";
import { MaterialRegularIcons } from "./material-regular/MaterialRegularIcons";

export interface IconProvider extends Plugin {
  name: "icon-provider";
  icons: Icons;
}

export const createIconProviderPlugin = (icons: Icons): IconProvider => {
  return { icons, name: "icon-provider" };
};

export const IconProviderPlugin = createIconProviderPlugin(
  MaterialRegularIcons
);

import { Plugin } from "../../plugins/Plugin";
import { EditorIcon } from "./Icon";
import { DeleteIcon } from "./DeleteIcon";
import { LinkIcon } from "./LinkIcon";
import { UnlikeIcon } from "./UnlinkIcon";
import { LaunchIcon } from "./LaunchIcon";
import { ErrorAlertIcon } from "./ErrorAlertIcon";
import { WarningAlertIcon } from "./WarningAlertIcon";
import { InfoAlertIcon } from "./InfoAlertIcon";
import { SettingsIcon } from "./SettingsIcon";
import { DropdownIcon } from "./DropdownIcon";
import { MoreIcon } from "./MoreIcon";
import { CheckIcon } from "./CheckIon";
import { MoreVertIcon } from "./MoeVertIcon";
import { DateIcon } from "./DateIcon";
import { PlusIcon } from "./PlusIcon";

export interface IconProvider extends Plugin {
  data: Icons;
  name: "icon-provider";
}

export interface Icons {
  delete: EditorIcon;
  link: EditorIcon;
  unlink: EditorIcon;
  openLink: EditorIcon;
  errorAlert: EditorIcon;
  warningAlert: EditorIcon;
  infoAlert: EditorIcon;
  settings: EditorIcon;
  dropdownIcon: EditorIcon;
  moreIcon: EditorIcon;
  moreVertIcon: EditorIcon;
  checkIcon: EditorIcon;
  dateIcon: EditorIcon;
  plusIcon: EditorIcon;
}

export const createIconProviderPlugin = (data: Icons): IconProvider => {
  return { data, name: "icon-provider" };
};

export const IconProviderPlugin = createIconProviderPlugin({
  delete: DeleteIcon,
  link: LinkIcon,
  unlink: UnlikeIcon,
  openLink: LaunchIcon,
  errorAlert: ErrorAlertIcon,
  warningAlert: WarningAlertIcon,
  infoAlert: InfoAlertIcon,
  settings: SettingsIcon,
  dropdownIcon: DropdownIcon,
  moreIcon: MoreIcon,
  moreVertIcon: MoreVertIcon,
  checkIcon: CheckIcon,
  dateIcon: DateIcon,
  plusIcon: PlusIcon,
});

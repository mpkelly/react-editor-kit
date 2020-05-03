import { Plugin } from "../../plugins/Plugin";
import { Icons } from "./Icons";
export interface IconProvider extends Plugin {
    name: "icon-provider";
    icons: Icons;
}
export declare const createIconProviderPlugin: (icons: Icons) => IconProvider;
export declare const IconProviderPlugin: IconProvider;

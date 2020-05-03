import { useEditorKit } from "../editor/EditorKit";
import { Plugin } from "./Plugin";

export const usePlugin = <T extends Plugin>(name: string): T => {
  const { plugins } = useEditorKit();
  const plugin = plugins.find((plugin) => plugin.name === name);
  if (!plugin) {
    throw Error(`No plugin with name ${name} has been registered`);
  }
  return plugin as T;
};

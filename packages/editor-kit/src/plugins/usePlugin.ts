import { useEditorKit } from "../editor/EditorKit";

export const usePlugin = (name: string) => {
  const { plugins } = useEditorKit();
  return plugins.find(plugin => plugin.name === name);
};

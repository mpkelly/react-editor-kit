import { useEffect, useCallback } from "react";
import { useEditorKit } from "../editor/EditorKit";
import { ReactEditor } from "slate-react";

export interface KeyPressProps {
  targetKeys: string | string[];
  handler: (event: KeyboardEvent) => any;
  deps: any[];
  editor: HTMLElement;
}

export const useKeyPress = (props: KeyPressProps) => {
  const { targetKeys, handler, deps, editor } = props;

  const downHandler = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    if (targetKeys === "*") {
      handler(event);
    } else if (targetKeys.includes(key)) {
      handler(event);
    }
  }, deps);
  useEffect(() => {
    editor && editor.addEventListener("keydown", downHandler);
    return () => {
      editor && editor.removeEventListener("keydown", downHandler);
    };
  }, deps);
};

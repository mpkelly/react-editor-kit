import { useEffect, useCallback } from "react";

export interface KeyPressProps {
  targetKeys: string | string[];
  handler: (event: KeyboardEvent) => any;
  deps: any[];
}

export const useKeyPress = (props: KeyPressProps) => {
  const { targetKeys, handler, deps } = props;

  const downHandler = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    if (targetKeys === "*") {
      handler(event);
    } else if (targetKeys.includes(key)) {
      handler(event);
    }
  }, deps);
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, deps);
};

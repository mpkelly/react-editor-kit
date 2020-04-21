import { useState, useRef, useCallback } from "react";

export const useSpellcheck = (
  enabled: boolean,
  id: string,
  callback = () => {}
) => {
  const [spellCheck, setSpellCheck] = useState(enabled);
  const timeout = useRef(0);

  const disableSpellCheck = () => {
    clearTimeout(timeout.current);
    setSpellCheck(false);
    callback();
  };

  const enableSpellCheck = () => {
    clearTimeout(timeout.current);
    setSpellCheck(true);
    callback();
  };

  const delaySpellCheck = useCallback(() => {
    if (spellCheck) {
      setSpellCheck(false);
      timeout.current = setTimeout(() => {
        enableSpellCheck();
        callback();
      }, 3000);
    }
    return () => {
      clearTimeout(timeout.current);
    };
  }, [spellCheck]);
  return { spellCheck, disableSpellCheck, enableSpellCheck, delaySpellCheck };
};

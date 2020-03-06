import { useEffect, useCallback, useState } from "react";
import { isInside } from "../ui/Utils";

export const useHover = (element: HTMLElement | null) => {
  const [over, setOver] = useState(false);

  const handleMove = useCallback(
    (event: MouseEvent) => {
      if (element) {
        const bounds = element.getBoundingClientRect();
        setOver(isInside(bounds, event.clientX, event.clientY));
      }
    },
    [element]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, [element]);
  return over;
};

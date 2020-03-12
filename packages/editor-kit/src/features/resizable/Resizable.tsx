import React, {
  useState,
  useRef,
  useEffect,
  Fragment,
  useCallback
} from "react";
import { OverlayLayer } from "../../ui/Layers";
import { Overlay } from "../../ui/Popup";
import { Show } from "../../ui/Show";

export interface ResizableProps {
  children: JSX.Element;
  initialWidth: string | number;
  onChange?(width: number): void;
}

export const Resizable = (props: ResizableProps) => {
  const { initialWidth, children, onChange } = props;
  const [state, setState] = useState({ width: initialWidth, down: -1 });
  const element = useRef<HTMLElement | null>(null);
  const multiplier = useRef(1);

  const handleRef = (ref: HTMLElement | null) => {
    element.current = ref;
  };

  const handleUp = useCallback(() => {
    if (state.down > -1) {
      setState(current => ({ ...current, down: -1 }));
    }
  }, [state]);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      if (state.down > -1) {
        const delta = event.clientX - state.down;
        if (delta !== 0) {
          const current = element.current?.getBoundingClientRect()
            .width as number;
          const width = current + delta * multiplier.current;
          onChange && onChange(width);
          setState({ width, down: event.clientX });
        }
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [state]);

  const handleDown = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const element = event.target as HTMLElement;
    if (element.classList.contains("rek-resize-handle-start")) {
      multiplier.current = -1;
    } else {
      multiplier.current = 1;
    }
    const down = event.clientX;
    setState(current => ({ ...current, down }));
  };

  return (
    <Fragment>
      <div
        className="rek-resizable"
        style={{ width: state.width }}
        ref={handleRef}
      >
        <div className="rek-resize-handle-start" onMouseDown={handleDown} />
        <div className="rek-resize-handle-end" onMouseDown={handleDown} />
        {children}
      </div>
      <Show when={state.down > -1}>
        <Overlay onMouseUp={handleUp} />
      </Show>
    </Fragment>
  );
};

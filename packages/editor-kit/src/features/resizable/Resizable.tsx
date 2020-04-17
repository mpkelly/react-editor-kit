import React, {
  useState,
  useRef,
  Fragment,
  useCallback,
  CSSProperties,
} from "react";
import { Overlay } from "../../ui/Popup";
import { Show } from "../../ui/Show";
import ReactDOM from "react-dom";

export interface ResizableProps {
  children: JSX.Element;
  style?: CSSProperties;
  initialWidth: string | number;
  onChange?(width: number): void;
}

export const Resizable = (props: ResizableProps) => {
  const { initialWidth, children, onChange, style } = props;
  const [state, setState] = useState({ width: initialWidth, down: -1 });
  const element = useRef<HTMLElement | null>(null);
  const multiplier = useRef(1);

  const handleRef = (ref: HTMLElement | null) => {
    element.current = ref;
  };

  const handleUp = useCallback(() => {
    if (state.down > -1) {
      setState((current) => ({ ...current, down: -1 }));
    }
  }, [state]);

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
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
    },
    [state]
  );

  const handleDown = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const element = event.target as HTMLElement;
    if (element.classList.contains("rek-resize-handle-start")) {
      multiplier.current = -1;
    } else {
      multiplier.current = 1;
    }
    const down = event.clientX;
    setState((current) => ({ ...current, down }));
  };

  const allStyle = { ...(style || {}), ...{ width: state.width } };

  return (
    <Fragment>
      <div className="rek-resizable" style={allStyle} ref={handleRef}>
        <div
          className="rek-resize-handle-start"
          onMouseDown={handleDown}
          contentEditable={false}
        />
        <div
          className="rek-resize-handle-end"
          onMouseDown={handleDown}
          contentEditable={false}
        />
        {children}
      </div>
      <Show when={state.down > -1}>
        {ReactDOM.createPortal(
          <Overlay onMouseUp={handleUp} onMouseMove={handleMove} />,
          document.body
        )}
      </Show>
    </Fragment>
  );
};

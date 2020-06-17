import React, {
  useState,
  useRef,
  Fragment,
  useCallback,
  CSSProperties,
  useEffect,
} from "react";
import { Overlay } from "../../ui/Popup";
import { Show } from "../../ui/Show";
import ReactDOM from "react-dom";
import { RenderElementProps } from "slate-react";

export interface ResizableProps extends Partial<RenderElementProps> {
  children: React.ReactNode;
  style?: CSSProperties;
  initialWidth: string | number;
  onChange?(width: number): void;
}

export const Resizable = (props: ResizableProps) => {
  const {
    initialWidth,
    children,
    onChange,
    style,
    attributes,
    ...rest
  } = props;
  const [state, setState] = useState({
    width: initialWidth,
    down: -1,
    multiplier: 1,
  });
  const [element, setElement] = useState<HTMLElement | null>(null);

  const handleRef = useCallback(
    (node: HTMLElement | null) => {
      if (node && !element) {
        setElement(node);
      }
    },
    [element]
  );

  useEffect(() => {
    const handleUp = () => {
      if (state.down > -1) {
        setState((current) => ({ ...current, down: -1 }));
      }
    };
    window.addEventListener("mouseup", handleUp);
    return () => window.removeEventListener("mouseup", handleUp);
  }, [state.down]);

  const handleMove = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (state.down > -1) {
        const x = event.clientX;
        const delta = x - state.down;
        if (delta !== 0 && element) {
          const current = element?.getBoundingClientRect().width as number;

          const width = current + delta * state.multiplier;
          onChange && onChange(width);
          setState((current) => ({ ...current, width, down: x }));
        }
      }
    },
    [state, element]
  );

  const handleDown = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const element = event.target as HTMLElement;
    let multiplier = 1;
    if (element.hasAttribute("data-start")) {
      multiplier = -1;
    }
    const down = event.clientX;
    setState((current) => ({ ...current, down, multiplier }));
  };

  const allStyle = { ...(style || {}), ...{ width: state.width } };

  return (
    <Fragment>
      <div
        className="rek-resizable"
        style={allStyle}
        {...attributes}
        ref={handleRef}
      >
        <div
          className="rek-resize-handle rek-resize-handle-start"
          onMouseDown={handleDown}
          contentEditable={false}
          data-start
        >
          <div className="rek-resize-track rek-resize-track-start" data-start>
            <div className="rek-resize-handle-grip" data-start />
          </div>
        </div>
        <div
          className="rek-resize-handle rek-resize-handle-end"
          onMouseDown={handleDown}
          contentEditable={false}
        >
          <div className="rek-resize-track rek-resize-track-end">
            <div className="rek-resize-handle-grip" />
          </div>
        </div>
        <div className="rek-resizable-content">{children}</div>
      </div>
      <Show when={state.down > -1}>
        {ReactDOM.createPortal(
          <Overlay onMouseMove={handleMove}> </Overlay>,
          document.body
        )}
      </Show>
    </Fragment>
  );
};

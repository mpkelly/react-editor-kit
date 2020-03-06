import ReactDOM from "react-dom";

export interface PortalProps {
  children: JSX.Element;
}

export const Portal = (props: PortalProps) => {
  return ReactDOM.createPortal(props.children, document.body);
};

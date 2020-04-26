import ReactDOM from "react-dom";

export interface PortalProps {
  children: React.ReactNode;
}

export const Portal = (props: PortalProps) => {
  return ReactDOM.createPortal(props.children, document.body);
};

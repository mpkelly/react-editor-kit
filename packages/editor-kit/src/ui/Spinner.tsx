import React from "react";

export interface SpinnerProps {
  className?: string;
}

export const Spinner = (props: SpinnerProps) => {
  const className = props.className || "";
  return <div className={`rek-spinner ${className}`} />;
};

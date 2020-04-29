import { useState } from "react";

export const useForceUpdate = () => {
  const [, setState] = useState({});
  const forceUpdate = () => setState({});
  return forceUpdate;
};

export const isInside = (rect: ClientRect, x: number, y: number) => {
  return (
    x >= rect.left &&
    x <= rect.left + rect.width &&
    y >= rect.top &&
    y <= rect.top + rect.height
  );
};

export const isDeleting = (event: React.KeyboardEvent) => {
  return event.keyCode == 8 || event.keyCode == 46;
};

export const stopEvent = (
  event: React.MouseEvent<any> | MouseEvent | React.KeyboardEvent
) => {
  event.stopPropagation();
  return true;
};

export const blockEvent = (
  event:
    | React.MouseEvent<any>
    | MouseEvent
    | React.KeyboardEvent
    | KeyboardEvent
) => {
  event.preventDefault();
  event.stopPropagation();
  return true;
};

export const noOp = (...args: any[]) => {};

export const clone = (value: any) => {
  return JSON.parse(JSON.stringify(value));
};

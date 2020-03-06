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

export const stop = (
  event: React.MouseEvent<any> | MouseEvent | React.KeyboardEvent
) => event.stopPropagation();

export const block = (
  event:
    | React.MouseEvent<any>
    | MouseEvent
    | React.KeyboardEvent
    | KeyboardEvent
) => {
  event.stopPropagation();
  event.preventDefault();
};

export const noOp = (...args: any[]) => {};

export const clone = (value: any) => {
  return JSON.parse(JSON.stringify(value));
};

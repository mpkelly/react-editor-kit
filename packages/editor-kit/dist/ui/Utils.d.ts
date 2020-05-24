export declare const isInside: (rect: ClientRect, x: number, y: number) => boolean;
export declare const isDeleting: (event: React.KeyboardEvent | KeyboardEvent) => boolean;
export declare const stopEvent: (event: React.MouseEvent<any> | MouseEvent | React.KeyboardEvent) => boolean;
export declare const blockEvent: (event: React.MouseEvent<any> | MouseEvent | React.KeyboardEvent | KeyboardEvent) => boolean;
export declare const noOp: (...args: any[]) => void;
export declare const clone: (value: any) => any;

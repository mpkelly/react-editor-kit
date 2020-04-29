/// <reference types="react" />
export declare const isInside: (rect: ClientRect, x: number, y: number) => boolean;
export declare const isDeleting: (event: import("react").KeyboardEvent<Element>) => boolean;
export declare const stopEvent: (event: MouseEvent | import("react").KeyboardEvent<Element> | import("react").MouseEvent<any, MouseEvent>) => boolean;
export declare const blockEvent: (event: MouseEvent | KeyboardEvent | import("react").KeyboardEvent<Element> | import("react").MouseEvent<any, MouseEvent>) => boolean;
export declare const noOp: (...args: any[]) => void;
export declare const clone: (value: any) => any;

/// <reference types="react" />
export declare const isInside: (rect: ClientRect, x: number, y: number) => boolean;
export declare const isDeleting: (event: import("react").KeyboardEvent<Element>) => boolean;
export declare const stop: (event: MouseEvent | import("react").KeyboardEvent<Element> | import("react").MouseEvent<any, MouseEvent>) => void;
export declare const block: (event: MouseEvent | import("react").KeyboardEvent<Element> | import("react").MouseEvent<any, MouseEvent> | KeyboardEvent) => void;
export declare const noOp: (...args: any[]) => void;
export declare const clone: (value: any) => any;

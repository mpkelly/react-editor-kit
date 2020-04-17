/// <reference types="react" />
export declare const useKeyNavigation: (total: number, handleSelect: (index: number) => any, initialActive: number, enabled: boolean, editor: HTMLElement) => {
    activeIndex: number;
    setActive: import("react").Dispatch<import("react").SetStateAction<number>>;
};

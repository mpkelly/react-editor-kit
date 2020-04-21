export declare const useSpellcheck: (enabled: boolean, id: string, callback?: () => void) => {
    spellCheck: boolean;
    disableSpellCheck: () => void;
    enableSpellCheck: () => void;
    delaySpellCheck: () => () => void;
};

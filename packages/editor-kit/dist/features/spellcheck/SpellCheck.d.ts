export declare const useSpellcheck: (enabled: boolean, callback?: () => void) => {
    spellCheck: boolean;
    disableSpellCheck: () => void;
    enableSpellCheck: () => void;
    delaySpellCheck: () => () => void;
};

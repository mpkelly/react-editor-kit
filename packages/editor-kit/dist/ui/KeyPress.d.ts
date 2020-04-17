export interface KeyPressProps {
    targetKeys: string | string[];
    handler: (event: KeyboardEvent) => any;
    deps: any[];
    editor: HTMLElement;
}
export declare const useKeyPress: (props: KeyPressProps) => void;

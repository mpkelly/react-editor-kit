export interface KeyPressProps {
    targetKeys: string | string[];
    handler: (event: KeyboardEvent) => any;
    deps: any[];
}
export declare const useKeyPress: (props: KeyPressProps) => void;

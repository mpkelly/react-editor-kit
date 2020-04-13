/// <reference types="react" />
export interface CheckboxProps {
    checked: boolean;
    onChange(checked: boolean): void;
    label: string;
}
export declare const Checkbox: (props: CheckboxProps) => JSX.Element;

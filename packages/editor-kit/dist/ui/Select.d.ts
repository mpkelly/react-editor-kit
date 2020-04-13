import React, { CSSProperties } from "react";
import { ListItem } from "./List";
export interface SelectProps {
    onInputChange?(value: string): void;
    onItemSelected(item: SelectItem): void;
    onFocus?(): void;
    className?: string;
    items: SelectItem[];
    selected?: SelectItem;
    value?: string | number;
    type?: string;
    editable?: boolean;
}
export interface SelectItem {
    text: string;
    value: any;
    style?: CSSProperties;
    disabled?: boolean;
}
export declare const Select: (props: SelectProps) => JSX.Element;
export declare const useSelect: (props: SelectProps) => {
    show: boolean;
    value: React.Key;
    activeIndex: number;
    handleRef: (ref: HTMLInputElement | null) => void;
    handleValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleFocus: (event: React.MouseEvent<Element, MouseEvent>) => void;
    items: ListItem[];
    hideChoices: () => void;
    element: HTMLElement | null;
    handleBlur: () => void;
};

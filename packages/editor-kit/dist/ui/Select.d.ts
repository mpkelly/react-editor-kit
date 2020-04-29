import React, { CSSProperties } from "react";
import { ListItem } from "./List";
import { TooltipContentProps } from "../features/popup/Tooltip";
export interface SelectProps extends TooltipContentProps {
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
export declare const useSelect: (props: SelectProps, editor: HTMLElement) => {
    show: boolean;
    value: React.ReactText;
    activeIndex: number;
    handleRef: (ref: HTMLInputElement) => void;
    handleValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleFocus: (event: React.MouseEvent<Element, MouseEvent>) => void;
    items: ListItem[];
    hideChoices: () => void;
    element: HTMLElement;
    handleBlur: () => void;
};

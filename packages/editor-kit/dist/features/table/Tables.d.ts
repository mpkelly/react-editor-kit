import { Element } from "slate";
export declare const useTables: () => {
    addColumn: (element: Element, before?: boolean) => void;
    addRow: (element: Element, before?: boolean) => void;
    deleteColumn: (element: Element) => void;
    deleteRow: (element: Element) => void;
};

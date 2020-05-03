import { Plugin } from "../../plugins/Plugin";
export declare const createEmptyFixedBlock: (text?: string) => {
    type: string;
    children: {
        text: string;
    }[];
};
export declare const createFixedTitlePlugin: (placeholder?: string, createBlock?: (text?: string) => {
    type: string;
    children: {
        text: string;
    }[];
}) => Plugin;

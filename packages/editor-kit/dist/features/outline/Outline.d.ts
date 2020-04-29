import { Node } from "slate";
export declare const DefaultOutlineTypes: string[];
export interface OutlineEntry {
    content: string;
    depth: number;
    node: Node;
}
export declare const createOutline: (nodes: Node[], types?: string[], flat?: boolean) => OutlineEntry[];

import * as React from "react";
import { Plugin } from "../../plugins/Plugin";
import { RenderElementProps, ReactEditor } from "slate-react";
export declare const createFixedBlock: (text?: string) => {
    type: string;
    children: {
        text: string;
    }[];
};
export declare const createFixedTitlePlugin: (placeholder?: string) => Plugin;
export interface FixedTitleProps extends RenderElementProps {
    placeholder: string;
}
export declare const FixedTitle: (props: FixedTitleProps) => JSX.Element;
export declare const handleEnter: (editor: ReactEditor, event: React.KeyboardEvent<Element>) => boolean;

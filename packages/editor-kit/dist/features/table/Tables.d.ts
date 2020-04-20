import React from "react";
import { RenderElementProps } from "slate-react";
export declare const useTables: (props: RenderElementProps) => {
    active: boolean;
    handleClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    showMenu: boolean;
    position: React.MutableRefObject<{
        top: number;
        left: number;
    }>;
    listItems: {
        text: string;
        onClick: () => void;
    }[];
};

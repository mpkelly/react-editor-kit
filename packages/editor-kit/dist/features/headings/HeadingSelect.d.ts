/// <reference types="react" />
export interface HeadingSelectProps {
    types?: {
        type: string;
        name: string;
    }[];
}
export declare const HeadingSelect: (props: HeadingSelectProps) => JSX.Element;
export declare const DefaultTypes: {
    type: string;
    name: string;
}[];

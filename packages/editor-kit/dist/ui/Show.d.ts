/// <reference types="react" />
export interface ShowProps {
    when: boolean | undefined | null;
    children: JSX.Element | JSX.Element[];
}
export declare const Show: (props: ShowProps) => JSX.Element;

import { ReactNode } from "react";
export interface ShowProps {
    when: any | undefined | null;
    children: ReactNode;
}
export declare const Show: (props: ShowProps) => JSX.Element;

import * as React from "react";
import { Suggestions } from "./Suggestions";
export interface SuggestionListProps {
    match: string;
    suggestions: Suggestions;
    onChoice(choice?: Object): void;
}
export declare const SuggestionList: React.MemoExoticComponent<(props: SuggestionListProps) => JSX.Element>;

/// <reference types="react" />
import { RenderLeafProps } from "slate-react";
import { Suggestions } from "./Suggestions";
export interface SuggestionProps extends RenderLeafProps {
    suggestions: Suggestions;
    type: string;
    onChoice(choice?: any, display?: String): void;
}
export declare const Suggestion: (props: SuggestionProps) => JSX.Element;

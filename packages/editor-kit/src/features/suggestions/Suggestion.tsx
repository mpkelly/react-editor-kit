import React, { Fragment } from "react";
import { Node } from "slate";
import { RenderLeafProps } from "slate-react";
import { Suggestions } from "./Suggestions";
import { SuggestionList } from "./SuggestionList";

export interface SuggestionProps extends RenderLeafProps {
  suggestions: Suggestions;
  type: string;
  onChoice(choice?: any, display?: String): void;
}

export const Suggestion = (props: SuggestionProps) => {
  const { type, leaf, children, attributes, suggestions, onChoice } = props;

  return (
    <Fragment>
      <span {...attributes} className={`rek-suggestion-marker ${type}`}>
        {children}
      </span>
      <SuggestionList
        match={Node.string(leaf)}
        suggestions={suggestions}
        onChoice={onChoice}
      />
    </Fragment>
  );
};

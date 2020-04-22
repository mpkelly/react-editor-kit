import React, { memo } from "react";
import { RenderElementProps } from "slate-react";
import { Trigger } from "../../plugins/Plugin";
import {
  createSuggestionsPlugin,
  SuggestionPluginOptions,
} from "../suggestions/SuggestionsPlugin";
import { Suggestions } from "../suggestions/Suggestions";

export interface Mention {
  name: string;
  imageUrl?: string;
  subText?: string;
}

export interface StaticMentionOptions {
  mentions: Mention[];
  triggers?: Trigger[];
}

export const DefaultTriggers: Trigger[] = [
  { pattern: /@(\w+)$/, range: "word-before" },
];

export const createStaticMentions = (options: StaticMentionOptions) => {
  const suggestions: Suggestions = {
    getSuggestions: (match: string) => {
      const lower = match.toLowerCase().substring(1);
      return Promise.resolve(
        options.mentions.filter((mention) =>
          mention.name.toLowerCase().includes(lower)
        )
      );
    },
    renderChoice: (choice: Mention) => {
      return <MentionChoice choice={choice} />;
    },
    triggers: options.triggers || DefaultTriggers,
    displayText: (choice: Mention) => `@${choice.name}`,
    renderSuggestion: (props: RenderElementProps) => {
      return <MentionElement {...props} />;
    },
  };

  const suggestionsOptions: SuggestionPluginOptions = {
    type: "mention",
    suggestions,
    globalStyle: GlobalStyle,
    editorStyle: EditorStyle,
  };

  return createSuggestionsPlugin(suggestionsOptions);
};

export interface MentionChoiceProps {
  choice: Mention;
}

export const MentionChoice = memo((props: MentionChoiceProps) => {
  const { choice } = props;
  return (
    <div className="rek-mention-choice">
      {choice.imageUrl && <img src={choice.imageUrl} />}
      <span className={"rek-mention-name"}>{choice.name}</span>
      {choice.subText && (
        <span className={"rek-mention-subtext"}>{choice.subText}</span>
      )}
    </div>
  );
});

export const MentionElement = (props: RenderElementProps) => {
  const { attributes, element, children } = props;
  return (
    <div
      {...attributes}
      contentEditable={false}
      className={"rek-mention"}
      data-id-mention={element.displayText}
    >
      {element.displayText}
      {children}
    </div>
  );
};

export const GlobalStyle = `
  .rek-mention-choice {
    display:flex;
    align-items:center;
    padding:4px;
    
    img {
      border-radius:50%;
      height:30px;
      width:30px;
      margin-right:16px;
    } 

    .rek-mention-subtext {
      margin-left:8px;
      color:var(--secondary-text-color);
      font-size:smaller;
    }
  }
`;

export const EditorStyle = `
  .rek-mention {
    display:inline-flex;
    background-color: var(--gray-light2-color);
    padding: 1px 3px;
    border-radius: 2px;
  }
`;

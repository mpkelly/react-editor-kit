import * as React from "react";
import { memo } from "react";
import { RenderElementProps } from "slate-react";
import {
  Trigger,
  Suggestions,
  SuggestionPluginOptions,
  createSuggestionsPlugin,
} from "@mpkelly/react-editor-kit";

export interface StaticHashtagOptions {
  hashtags: string[];
  triggers?: Trigger[];
}

export const DefaultTriggers: Trigger[] = [
  { pattern: /#(\w+)$/, range: "block" },
];

export const createStaticHashtags = (options: StaticHashtagOptions) => {
  const suggestions: Suggestions = {
    getSuggestions: (match: string) => {
      const lower = match.toLowerCase();
      return Promise.resolve(
        options.hashtags.filter((hashtag) =>
          hashtag.toLowerCase().includes(lower)
        )
      );
    },
    renderChoice: (choice: string) => {
      return <HashtagChoice choice={choice} />;
    },
    triggers: options.triggers || DefaultTriggers,
    renderSuggestion: (props: RenderElementProps) => {
      return <HashtagElement {...props} />;
    },
  };

  const suggestionsOptions: SuggestionPluginOptions = {
    type: "hashtag",
    suggestions,
    globalStyle: GlobalStyle,
    editorStyle: EditorStyle,
  };
  return createSuggestionsPlugin(suggestionsOptions);
};

export interface HashtagChoiceProps {
  choice: string;
}

export const HashtagChoice = memo((props: HashtagChoiceProps) => {
  const { choice } = props;
  return (
    <div className="hashtag-choice">
      <span>{choice}</span>
    </div>
  );
});

export const HashtagElement = (props: RenderElementProps) => {
  const { attributes, element, children } = props;
  return (
    <span {...attributes} contentEditable={false} className={"hashtag"}>
      {element.value}
      {children}
    </span>
  );
};

export const GlobalStyle = `
  .hashtag-choice {
    display:flex;
    align-items:center;
    padding:4px;
  }
`;

export const EditorStyle = `
  .hashtag {
    color:blue;
  }
`;

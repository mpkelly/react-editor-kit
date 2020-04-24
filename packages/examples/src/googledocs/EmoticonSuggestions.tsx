import * as React from "react";
import { RenderElementProps } from "slate-react";
import {
  Trigger,
  Suggestions,
  SuggestionPluginOptions,
  createSuggestionsPlugin,
} from "@mpkelly/react-editor-kit";

export interface Emoticon {
  patterns: string[];
  //You could just store the unicode code here instead of an ID to map from
  id: number;
}

export interface EmoticonOptions {
  emoticons: Emoticon[];
  triggers: Trigger[];
}

export const DefaultTriggers: Trigger[] = [
  //Listen for a colon  before the cursor;
  { pattern: /:\w+/, range: "line-before" },
];

interface EmoticonType {
  [key: number]: { name: string; value: string };
}

const Emoticons: EmoticonType = {
  1: { name: "Grinning face", value: "😀" },
  2: { name: "Grinning face big eyes", value: "😄" },
  3: { name: "Beaming smiling face ", value: "😁" },
  4: { name: "Squinting face", value: "😆" },
  5: { name: "Sweating face", value: "😅" },
  6: { name: "Rolling laughing face", value: "🤣" },
  7: { name: "Joyful tears face", value: "😂" },
  8: { name: "Slightly smiling face", value: "🙂" },
  9: { name: "Winking face", value: "😉" },
  10: { name: "Blusing face", value: "😊" },
};

const EmoticonChoices: Emoticon[] = [
  {
    id: 1,
    patterns: [":grinning", ":grin", ":)"],
  },
  {
    id: 2,
    patterns: [":grinning_eye", ":grin_eyes"],
  },
  {
    id: 3,
    patterns: [":beaming", ":beam", ":D"],
  },
  {
    id: 4,
    patterns: [":grin_squint", ":squint"],
  },
  {
    id: 5,
    patterns: [":grin_sweat", ":sweat"],
  },
  {
    id: 6,
    patterns: [":rofl"],
  },
  {
    id: 7,
    patterns: [":joy"],
  },
  {
    id: 8,
    patterns: [":slight_smile"],
  },
  {
    id: 9,
    patterns: [":wink", ";)"],
  },
  {
    id: 10,
    patterns: [":blush"],
  },
];

export const DefaultEmoticonOptions: EmoticonOptions = {
  triggers: DefaultTriggers,
  emoticons: EmoticonChoices,
};

// Expects a promise even if you are using an in-memory/static list
export const createEmoticonSuggestions = (
  options: EmoticonOptions = DefaultEmoticonOptions
) => {
  const suggestions: Suggestions = {
    getSuggestions: (match: string) => {
      const lower = match.toLowerCase();
      return Promise.resolve(
        options.emoticons.filter((emoticon) =>
          emoticon.patterns.find((pattern) => pattern.includes(lower))
        )
      );
    },
    //The patterns that trigger suggestions to be shown
    triggers: options.triggers,

    // Render the choice list item
    renderChoice: (choice: Emoticon) => {
      return <EmoticonChoice choice={choice} />;
    },
    // This is what gets rendered into the editor once the choice is made
    renderSuggestion: (props: RenderElementProps) => {
      return <EmoticonElement {...props} />;
    },
  };

  const suggestionsOptions: SuggestionPluginOptions = {
    type: "emoticon",
    suggestions,
    globalStyle: GlobalStyle,
  };
  return createSuggestionsPlugin(suggestionsOptions);
};

export interface HashtagChoiceProps {
  choice: Emoticon;
}

export const EmoticonChoice = (props: HashtagChoiceProps) => {
  const { choice } = props;
  const emoticon = Emoticons[choice.id];
  return (
    <div className="emoticon-choice" key={choice.id}>
      <span className="emoticon-preview">{emoticon.value}</span>
      <span className="emoticon-name">{emoticon.name}</span>
    </div>
  );
};

export const EmoticonElement = (props: RenderElementProps) => {
  const { attributes, element, children } = props;
  const emoticon = Emoticons[element.value.id];
  return (
    <span {...attributes} contentEditable={false}>
      {emoticon.value}
      {children}
    </span>
  );
};

export const GlobalStyle = `
  .emoticon-choice {
    display:flex;
    align-items:center;
    padding:4px;

    .emoticon-preview {
      font-size:larger;
    }

    .emoticon-name {
      font-size:smaller;
      margin-left:8px;
      color: gray;
    }
  }
`;

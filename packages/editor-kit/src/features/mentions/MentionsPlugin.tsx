import React from "react";
import { RenderElementProps } from "slate-react";
import {
  createSuggestionsPlugin,
  SuggestionPluginOptions,
} from "../suggestions/SuggestionsPlugin";
import { Suggestions } from "../suggestions/Suggestions";
import { MentionGlobalStyle } from "./MentionGlobalStyle";
import { MentionEditorStyle } from "./MentionEditorStyle";
import { MentionElement } from "./MentionElement";
import { Mention } from "./Mention";
import { MentionChoice } from "./MentionChoice";
import { Trigger } from "../../plugins/Trigger";
import { MentionsTrigger } from "./MentionsTrigger";

export interface StaticMentionOptions {
  mentions: Mention[];
  triggers?: Trigger[];
}

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
    triggers: options.triggers || [MentionsTrigger],
    renderSuggestion: (props: RenderElementProps) => {
      return <MentionElement {...props} />;
    },
  };

  const suggestionsOptions: SuggestionPluginOptions = {
    type: "mention",
    suggestions,
    globalStyle: MentionGlobalStyle,
    editorStyle: MentionEditorStyle,
  };

  return createSuggestionsPlugin(suggestionsOptions);
};

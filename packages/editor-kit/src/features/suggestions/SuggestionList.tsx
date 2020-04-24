import * as React from "react";
import { useState, useEffect, useCallback, memo, Fragment } from "react";
import { Suggestions } from "./Suggestions";
import { Show } from "../../ui/Show";
import { CursorPopup } from "../popup/CursorPopup";
import { stop } from "../../ui/Utils";
import { Spinner } from "../../ui/Spinner";
import { useKeyNavigation } from "../../ui/KeyNavigation";
import { ensureInView } from "../../ui/List";
import { useEditorKit } from "../../editor/EditorKit";
import { ReactEditor } from "slate-react";
import { Editor } from "slate";

export interface SuggestionListProps {
  match: string;
  suggestions: Suggestions;
  onChoice(choice?: Object): void;
}

export const SuggestionList = memo((props: SuggestionListProps) => {
  const { match, suggestions, onChoice: onChoiceSelected } = props;
  const [choices, setChoices] = useState<any[]>([]);
  const handleSelect = (index: number) => {
    if (index > -1) {
      handleChoice(choices[index]);
    }
  };

  const { editor } = useEditorKit();
  const element = ReactEditor.toDOMNode(editor, editor);
  if (!element) {
    return null;
  }

  const { activeIndex, setActive } = useKeyNavigation(
    choices.length,
    handleSelect,
    0,
    true,
    element
  );

  useEffect(() => {
    suggestions.getSuggestions(match).then((result: any[]) => {
      if (result.length) {
        setActive(0);
        setChoices(result);
      } else {
        onChoiceSelected();
      }
    });
  }, [match]);

  const handleClose = () => onChoiceSelected();
  const handleChoice = (choice: any) => {
    onChoiceSelected(choice);
  };

  return (
    <Fragment>
      <Show when={!Boolean(choices.length)}>
        <CursorPopup onClose={handleClose} fixed location={"end"}>
          <Fragment>
            <Show when={Boolean(suggestions.renderLoading)}>
              {suggestions.renderLoading && suggestions.renderLoading()}
            </Show>
            <Show when={!Boolean(suggestions.renderLoading)}>
              <div className="rek-suggestion-loading rek-panel">
                <Spinner />
              </div>
            </Show>
          </Fragment>
        </CursorPopup>
      </Show>
      <Show when={Boolean(choices.length)}>
        <CursorPopup onClose={handleClose} fixed location={"end"}>
          <ul onClick={stop} className={"rek-suggestion-list rek-panel"}>
            <Show when={Boolean(choices.length)}>
              {choices.map((choice, index) => (
                <li
                  key={choice.id || choice.name || index}
                  ref={index === activeIndex ? ensureInView : undefined}
                  className={index === activeIndex ? "active" : ""}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    handleChoice(choice);
                  }}
                >
                  {suggestions.renderChoice(choice)}
                </li>
              ))}
            </Show>
          </ul>
        </CursorPopup>
      </Show>
    </Fragment>
  );
});

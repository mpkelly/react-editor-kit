import React, { memo } from "react";
import { Mention } from "./Mention";

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
